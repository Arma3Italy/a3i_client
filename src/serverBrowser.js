const keys = require('../cfg/keys.json');
const cfg = require('../cfg/cfg.json');
const fs = require('fs');
const path = require('path');

const axios = require('axios');
const url = `https://api.steampowered.com/IGameServersService/GetServerList/v1/?key=${keys.steamTOKEN}&format=json${cfg.serverListCFG.filters == '' ? '' : '&filter='+cfg.serverListCFG.filters}${cfg.serverListCFG.limit == '' ? '' : '&limit='+cfg.serverListCFG.limit}`;

const pathDB = path.resolve(__dirname, '..', 'db');
const file = 'serverList.json';

console.log('-> serverBrowser started');

/**
 * With type = 'o' -> Check if data is an object and returns it. if not, convert it to object and returns it.
 * With type = 's' -> Check if data is an string and returns it. if not, convert it to string and returns it.
 * 
 * @param {String} type o: object - s: string
 * @param {String|Object} data string or object to trasform
 * @example checkObject('s', { name: "tod", age: 23, hobby: "tennis" }) -> '{"name":"tod","age": 23,"hobby": "tennis"}'
 * @example checkobject('o', '{"name":"tod","age": 23,"hobby": "tennis"}') -> { nome: 'tod', age: 23, hobby: 'tennis' }
 */
function checkObject( type, data ) {
    if (type == 'o') return (typeof data == 'object' ? data : JSON.parse(data));
    if (type == 's') return (typeof data == 'string' ? data : JSON.stringify(data));
};

function parseGameTag( gameTag ) {
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
    server.updateTime = Date.now();
    server.serverClaim = [];
    server.gametype = parseGameTag(server.gametype);
    return server;
};

function serverList( servers ) {
    const filter = new RegExp(cfg.serverListCFG.reFilters,'gim');
    const serversFiltered = servers.filter(server => filter.test(server.name));
    const serverCount = serversFiltered.length;
    const serverList = serversFiltered.map(parseServer);

    return ({ serverUpdate: Date.now(), serverCount, serverList });
};

function fetchAPI ( url, cb ) {
    axios.get(url)
        .then(response => cb(undefined, response.data))
        .catch(err => cb(err, {}));
};

function checkServer( rout, olddata, newdata ) {
    olddata = checkObject( 'o', olddata );
    
    newdata.serverList = newdata.serverList.filter(
        (fitem) => !olddata.serverList.map(
            (fi2tem) => fi2tem.steamid
        ).includes(fitem.steamid)
    );

    olddata.serverList = olddata.serverList.concat(newdata.serverList);
    olddata.serverCount = olddata.serverList.length;
    olddata.serverUpdate = Date.now();

    initFileServerList( rout, olddata );
};

function initFileServerList( rout, data ) {
    fs.writeFileSync(rout, checkObject('s', data));
};

function checkFile( rout, file, dataServer ) {
    fs.readdir( rout, (err, data) => {
        if (err) {
            fs.mkdirSync( rout );
            initFileServerList( path.resolve( rout, file ), dataServer );
        } else {
            fs.readFile(path.resolve( rout, file ), 'utf8', async (rferr, rfdata) => {
                if (rferr) { initFileServerList( path.resolve( rout, file ), dataServer ) }
                else { checkServer( path.resolve( rout, file ), rfdata, dataServer ) };
            });
        };
    });
};


function serverListUpdater( dev = false ) {
    fetchAPI(url, (err, res) => {
        if (!err) checkFile(pathDB, file, serverList(checkObject('o', res.response.servers)));
    });
    if (dev) {
        console.log('-> serverListUpdater runned');
    };
};

module.exports = { serverListUpdater };