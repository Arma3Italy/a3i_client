const express = require('express');
const route = express.Router();
const fs = require('fs');
const path = require('path');
const serverListUpdater = require('../../api/serverList/serverBrowser');



const serverList = fs.readFileSync(path.resolve('db', 'serverList.json'), 'utf8');


// GET full serverList
route.get('/', (req, res) => {
    res.json(JSON.parse(serverList));
});

// GET specific server
route.get('/:id', (req, res) => {
    res.json(JSON.parse(serverList).serverList[req.params.id]);
});




module.exports = route;