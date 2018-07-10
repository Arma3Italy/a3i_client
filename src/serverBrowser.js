const keys = require('../cfg/keys.json');
const cfg = require('../cfg/cfg.json');
const fs = require('fs');
const path = require('path');

const axios = require('axios');

const url = `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${keys.steamTOKEN}&format=json${cfg.serverListCFG.filters == '' ? '' : '&filter='+cfg.serverListCFG.filters}${cfg.serverListCFG.limit == '' ? '' : '&limit='+cfg.serverListCFG.limit}`;

const pathDB = path.resolve(__dirname, '..', 'db');
const fileDB = 'serverList.json';

let dev = false;

console.log('-> serverBrowser started');

function checkObject( type, data ) {
    if (type == 'o') return (typeof data == 'object' ? data : JSON.parse(data));
    if (type == 's') return (typeof data == 'string' ? data : JSON.stringify(data));
};

function parseGameTag( gameTag ) {
    if (gameTag === undefined) return {};

    const tagsIndex = {b: "BattleEye", r: "RequiredVersion", n: "RequiredBuildNo", s: "ServerState", i: "Difficulty", m: "EqualModRequired", l: "Lock", v: "VerifySignatures", d: "Dedicated", t: "GameType", g: "Language", c: "LongLat", p: "Platform", h: "LoadedContentHash", o: "Country", e: "timeLeft", j: "param1", k: "param2", f: "allowedFilePatching", y: "island"};
    const newGameTag = gameTag.split(',');

    gameTag = {};

    for( const tag in newGameTag ) {
        const tagHead = newGameTag[tag].substring(0,1);
        if ( tagHead !== '' ) {
            const tagBody = newGameTag[tag].substring(1,newGameTag[tag].length);
            gameTag[tagsIndex[tagHead]] = tagBody;
        };
    };

    return gameTag;
};

function parseServer( server ) {
    server = checkObject('o', server)
    server.updateTime = Date.now();
    server.serverClaim = []; // steam ID del proprietario
    server.img = ""; // banner server
    server.desc = ""; // descrizione server
    server.rank = [
        { 
            time: {
                mese: 0,
                anno: 0
            },
            like: [], // steamID delle persone a chi piace il server
            dislike: [] // steamID delle persone a chi non piace il server
        }
    ];
    server.plyrank = [
        { 
            time: Date.now(),
            ply: server.players
        }
    ];
    server.status = true;
    server.gametype = parseGameTag(server.gametype);
    return server;
};

function filterServerList( servers ) {
    servers = checkObject( 'o', servers)
    const filter = new RegExp(cfg.serverListCFG.reFilters,'gim');
    const serversFiltered = servers.filter(server => filter.test(server.name));
    const serverCount = serversFiltered.length;
    const serverList = serversFiltered.map(parseServer);

    return ({ serverUpdate: Date.now(), serverCount, serverList });
};

function checkServerOFF( server ) {
    const currentData = Date.now();
    const giorni = 2;
    const delServer = Math.floor((currentData - server.updateTime) / (1000*60*60*24)) >= giorni ? true : false;
    const owners = server.serverClaim.length >= 1;

    if (owners) return true;
    return !delServer;
};

function checkServerON ( server, newServer ) {
    newServer = newServer.serverList.find(serv => serv.addr === server.addr );
    
    newServer.updateTime = Date.now();
    newServer.serverClaim = server.serverClaim;
    newServer.img = server.img;
    newServer.desc = server.desc;
    newServer.rank = server.rank;

    const playerRank = server.plyrank;
    playerRank.push(newServer.plyrank[0])
    newServer.plyrank = playerRank;
    newServer.status = true;

    return newServer;
};

function setStatusServer ( server, status ) {
    server.status = status;
    return server;
};

function checkServer( rout, olddata, newdata ) {
    olddata = checkObject( 'o', olddata );
    newdata = checkObject( 'o', newdata );
    
    let serversON = olddata.serverList.filter(serverO => newdata.serverList.find(serverN => serverN.addr == serverO.addr));
    let serversOFF = olddata.serverList.filter(serverO => !newdata.serverList.find(serverN => serverN.addr == serverO.addr));
    let serversNUOVI = newdata.serverList.filter(serverN => !olddata.serverList.find(serverO => serverN.addr == serverO.addr));

    if (dev) {
        console.log(`olddata: -> ${olddata.serverList.length}`);
        console.log(`newdata: -> ${newdata.serverList.length}`);
        console.log(`serversON: -> ${serversON.length}`);
        console.log(`serversOFF: -> ${serversOFF.length}`);
        console.log(`serversNUOVI: -> ${serversNUOVI.length}`);
    };

    serversOFF = serversOFF.map(server => setStatusServer(server, false));
    serversOFF = serversOFF.filter(checkServerOFF);
    serversON = serversON.map(server => checkServerON( server, newdata ));

    const serverAggiornati = [...serversON, ...serversOFF, ...serversNUOVI];
    newdata.serverList = serverAggiornati;
    newdata.serverCount = newdata.serverList.length;

    if (dev) { console.log(`serverAggiornati: -> ${newdata.serverList.length}`) };

    initFileServerList( rout, newdata );
};

function initFileServerList( rout, data ) {
    fs.writeFileSync(rout, checkObject('s', data));
};

function checkFile( rout, file, dataServer ) {
    fs.readdir( rout, (err, data) => {
        if (err) {
            fs.mkdirSync( rout );
            initFileServerList( path.resolve( rout, file ), filterServerList(dataServer) );
        } else {
            fs.readFile(path.resolve( rout, file ), 'utf8', async (rferr, rfdata) => {
                if (rferr) { initFileServerList( path.resolve( rout, file ), filterServerList(dataServer) ) }
                else { checkServer( path.resolve( rout, file ), rfdata, filterServerList(dataServer) ) };
            });
        };
    });
};

function serverListUpdater( devInput = false ) {
    dev = devInput;
    axios.get(url)
        .then(res => checkFile(pathDB, fileDB, checkObject('o', res.data.response.servers)))
        .catch(e => console.log(`-> ERROR to Load Servers { ${e} }`))
};

module.exports = { serverListUpdater };