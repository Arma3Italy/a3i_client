const express = require('express');
const route = express.Router();
const fs = require('fs');
const path = require('path');

const serverList = fs.readFileSync(path.resolve('db', 'serverList.json'), 'utf8');

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