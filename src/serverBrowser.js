
const cfg = require('../cfg/cfg').steam;
const axios = require('axios');
const { checkObject, checkFile } = require('./fnc');

const url = `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${cfg.apikey}&format=json${cfg.serverListCFG.filters == '' ? '' : '&filter=' + cfg.serverListCFG.filters}${cfg.serverListCFG.limit == '' ? '' : '&limit=' + cfg.serverListCFG.limit}`;

console.log('-> serverBrowser loaded');

function parseGameTag(gameTag) {
    if (gameTag === undefined) return {};

    const tagsIndex = { b: "battleEye", r: "requiredversion", n: "requiredbuildno", s: "serverstate", i: "difficulty", m: "equalmodpequired", l: "lock", v: "verifysignatures", d: "dedicated", t: "gametype", g: "language", c: "longlat", p: "platform", h: "loadedcontenthash", o: "country", e: "timeleft", j: "param1", k: "param2", f: "allowedfilepatching", y: "island" };
    const neederTags = ['b', 'i', 'v', 't', 'o'];
    const newGameTag = gameTag.split(',');

    gameTag = {};

    const filteredTag = newGameTag.filter(tag => neederTags.includes(tag.substring(0, 1)));

    for (const tag in filteredTag) {
        const tagHead = filteredTag[tag].substring(0,1);
        if (tagHead !== '') {
            let tagBody = filteredTag[tag].substring(1, filteredTag[tag].length);
            if (tagBody == 't') {tagBody = true} 
            else if (tagBody == 'f') {tagBody = false} 
            else if (typeof(tagBody) === 'string') { tagBody = tagBody.toUpperCase() };
            gameTag[tagsIndex[tagHead]] = tagBody;
        };
    };

    return gameTag;
};

function parseServer(server) {
    server.updateTime = Date.now();

    server.serverClaim = [];
    server.img = "img/bannerServers/banner_test.jpg";
    server.desc = " PER LA DESCRIZIONE CONTATTARE XEDOM";

    server.rank = [
        {
            time: {
                mese: 0,
                anno: 0
            },
            like: [],
            dislike: []
        }
    ];

    server.plyrank = [ { time: Date.now(), ply: server.players } ];

    server.status = true;
    
    let gametype = parseGameTag(server.gametype);
    server.gametype = gametype.gametype;

    return { ...server, ...gametype };
};

function filterServerList(servers) {
    const filter = new RegExp(cfg.serverListCFG.reFilters, 'gim');
    const serversFiltered = servers.filter(server => filter.test(server.name));

    const serverCount = serversFiltered.length;
    const serverList = serversFiltered.map(parseServer);

    return ({ serverUpdate: Date.now(), serverCount, serverList });
};

function setOnServer(server, newServer) {
    newServer = newServer.serverList.find(serv => serv.addr === server.addr);

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

function checkOffServer(server) {
    const currentData = Date.now();
    const giorni = 2;
    const delServer = Math.floor((currentData - server.updateTime) / (1000 * 60 * 60 * 24)) >= cfg.serverListCFG.daysExpireOffServer ? true : false;
    const owners = server.serverClaim.length >= 1;

    if (owners) return true;
    return !delServer;
};

function setOffServer(server) {
    server.status = false;
    server.players = 0
    return server;
};

function checkServer(newdata, olddata) {
    olddata = checkObject('o', olddata);
    newdata = filterServerList(checkObject('o', newdata));
    
    if (olddata !== undefined && olddata.serverList !== undefined) {

        let serversON = olddata.serverList.filter(serverO => newdata.serverList.find(serverN => serverN.addr == serverO.addr));
        let serversOFF = olddata.serverList.filter(serverO => !newdata.serverList.find(serverN => serverN.addr == serverO.addr));
        let serversNUOVI = newdata.serverList.filter(serverN => !olddata.serverList.find(serverO => serverN.addr == serverO.addr));
    
        serversOFF = serversOFF.map(setOffServer);
        serversOFF = serversOFF.filter(checkOffServer);
        serversON = serversON.map(server => setOnServer(server, newdata));
    
        const serverAggiornati = [...serversON, ...serversOFF, ...serversNUOVI];
        newdata.serverList = serverAggiornati;
        newdata.serverCount = newdata.serverList.length;

    };

    return (checkObject('s', newdata));
};

function serverListUpdater() {
    axios.get(url)
        .then(res => checkFile(cfg.serverListCFG.dbDir, cfg.serverListCFG.dbServerListFile, checkObject('s', res.data.response.servers), checkServer))
        .catch(e => console.log(`-> ERROR to Load Servers { ${e} }`));
    
    console.log(`-> serverBrowser updated`);
};

serverListUpdater();

setInterval(serverListUpdater, 5*60*1000);
module.exports = { serverListUpdater };