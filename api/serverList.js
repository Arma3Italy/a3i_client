const express = require('express');
const route = express.Router();

const fs = require('fs');
const path = require('path');

const cfg = require('../cfg/cfg');

function updaterServerList() {
    return fs.readFileSync(path.resolve(cfg.steam.serverListCFG.dbDir, cfg.steam.serverListCFG.dbServerListFile), 'utf8');
};

let serverList = updaterServerList();

setInterval(() => {
    serverList = updaterServerList();
}, 5000);


route.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// GET full serverList
route.get('/', (req, res) => {
    res.json(JSON.parse(serverList));
});

route.get('/ip', (req, res) => {
    const serverTrovati = JSON.parse(serverList).serverList.find(server => {
        const ip = server.addr.split(":")[0];
        const port = server.gameport;

        if ((req.query.address == ip && req.query.port == port) || (req.query.ip !== undefined && req.query.ip == ip ) ) return true;
    });
    res.json(serverTrovati)
})

// GET specific server
route.get('/:id', (req, res) => {
    res.json(JSON.parse(serverList).serverList[req.params.id]);
});

route.post('/update', (req, res) => {
    console.log(req.body);
});

module.exports = route;