const express = require('express');
const route = express.Router();
const fs = require('fs');
const path = require('path');

function updaterServerList() {
    return fs.readFileSync(path.resolve('db', 'serverList.json'), 'utf8');
};

let serverList = updaterServerList();

setInterval(()=>{
    serverList = updaterServerList();
},5000);


route.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// GET full serverList
route.get('/', (req, res) => {
    res.json(JSON.parse(serverList));
});

/**
 * @route /api/serverList/ip
 * @param {number} address REQUIRED
 * @param {number} port
 * @example /api/serverList/ip?address=95.172.92.102&port=2303
 */
route.get('/ip', (req, res) => {
    const serverTrovati = JSON.parse(serverList).serverList.find(server => {
        const ip = server.addr.split(':')[0];
        const port = server.addr.split(':')[1];

        if ( req.query.address == ip && req.query.port == port ) {
            return true
        }
    });
    res.json(serverTrovati)
})

// GET specific server
route.get('/:id', (req, res) => {
    res.json(JSON.parse(serverList).serverList[req.params.id]);
});

route.post('/claim', (req, res) => {
    res.json({
        owner: req.session.user,
        server: req.body.server
    });
});

module.exports = route;