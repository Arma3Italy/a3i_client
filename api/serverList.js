const express = require('express');
const route = express.Router();
const fs = require('fs');
const path = require('path');

const serverList = fs.readFileSync(path.resolve('db', 'serverList.json'), 'utf8');


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
    res.json(JSON.parse(serverList).serverList.find(x => x.addr.split(':')[0] == req.query.address && (req.query.port !== undefined ? x.addr.split(':')[1] == String(parseInt(req.query.port) + 1) : true) ));
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