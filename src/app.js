module.exports = function () {
    const keys = require('../cfg/cfg');
    const express = require('express');
    const app = express();
    const port = process.env.PORT || keys.serverApp.port;
    const bodyParser = require('body-parser');

    // Connecction to DB
    const mongoose = require('mongoose');
    mongoose.connect(keys.mongo.url).then(() => console.log('-> Database MongoDB Connected')).catch(err => console.log(`-> Database error: ${err}`));

    // Settings
    app.use('/', express.static('static'));
    app.set('view engine', 'pug');
    app.set('views', './views');

    // middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Main Rounts
    app.get('/', (req, res) => {
        res.send('index');
    });

    // Routs
    app.use('/api/serverlist', require('../api/serverlist'));
    app.use('/api/login', require('../api/login'));

    // Start server
    app.listen(port, () => console.log(`-> Server started on port: ${port}`));
};  