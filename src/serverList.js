const keys = require('../cfg/keys.json');
const cfg = require('../cfg/cfg.json');
const fs = require('fs');
const pathM = require('path');
const date = Date.now();

const tagDiz = {b: "BattleEye", r: "RequiredVersion", n: "RequiredBuildNo", s: "ServerState", i: "Difficulty", m: "EqualModRequired", l: "Lock", v: "VerifySignatures", d: "Dedicated", t: "GameType", g: "Language", c: "LongLat", p: "Platform", h: "LoadedContentHash", o: "Country", e: "timeLeft", j: "param1", k: "param2", f: "allowedFilePatching", y: "island"};
const hostname = 'api.steampowered.com';
const path = `/IGameServersService/GetServerList/v1/?key=${keys.steamTOKEN}&format=json${cfg.serverListCFG.filters == '' ? '' : '&filter='+cfg.serverListCFG.filters}${cfg.serverListCFG.limit == '' ? '' : '&limit='+cfg.serverListCFG.limit}`;
const filter = new RegExp(cfg.serverListCFG.reFilters,'gim');

require('https').request({ hostname, path, method: 'GET' }, (res) => {
    let op = '';
    res.on('data', data => op += data);
    res.on('end', async () => {
        // crea il l'oggetto serverList
        const serverList = await { 
            serverClaimed: '', 
            serverUpdate: date, 
            serverCount: JSON.parse(op).response.servers.filter(server => filter.test(server.name)).map((item => { item.upDate = date; return item; })).length, 
            serverList: JSON.parse(op).response.servers.filter(server => filter.test(server.name)).map((item => {
                // analigga i tag di arma e li trasforma in un oggetto
                item.upDate = date;
                const gtm = item.gametype.split(',');
                item.gametype = {};
                for(let gt in gtm) {
                    const tag = gtm[gt].substring(0,1);
                    if (tag !== "") {
                        const val = gtm[gt].substring(1,gtm[gt].length);
                        item.gametype[tagDiz[tag]] = val;
                    }
                }
                return item;
            }))
        };

        // crea il file json, e slava l'oggetto serverList
        fs.readdir(pathM.resolve(__dirname, '..', 'db'), (err, data) => {
            if (err) {
                fs.mkdir(pathM.resolve(__dirname, '..', 'db'), (mkerr, mkdata) => {
                    fs.writeFileSync(pathM.resolve(__dirname, '..', 'db', 'serverList.json'), JSON.stringify(serverList));
                });
            } else {
                fs.readFile(pathM.resolve(__dirname, '..', 'db', 'serverList.json'), 'utf8', async (rferr, rfdata) => {
                    if (rferr) { fs.writeFileSync(pathM.resolve(__dirname, '..', 'db', 'serverList.json'), JSON.stringify(serverList)) }
                    else {
                        rfdata = await JSON.parse(rfdata);                                            
                        // controlla se ci sono nuovi server, cancella i server gia alvati nel file, aggiunge i nuovi server al file
                        serverList.serverList = await serverList.serverList.filter((fitem) => !rfdata.serverList.map((fiitem) => fiitem.steamid).includes(fitem.steamid))
                        rfdata.serverList = await rfdata.serverList.concat(serverList.serverList)
                        rfdata.serverCount = await rfdata.serverList.length;
                        rfdata.serverUpdate = await date;
                        fs.writeFileSync(pathM.resolve(__dirname, '..', 'db', 'serverList.json'), JSON.stringify(rfdata))
                    };
                });
            }
        });
    });
}).on('error', (e) => { console.error(e) }).end();