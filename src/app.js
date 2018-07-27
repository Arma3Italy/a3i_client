module.exports = function () {
    const express = require('express');
    const app = express();
    const port = 8888 || process.env.PORT;
    const keys = require('../cfg/cfg');

    // Connecction to DB
    const mongoose = require('mongoose');
    mongoose.connect(keys.mongo.url).then(() => console.log('-> Database MongoDB Connected')).catch(err => console.log(`-> Database error: ${err}`));

    // Settings
    app.use('/', express.static('static'));
    app.set('view engine', 'pug');
    app.set('views', './views');

    // Main Rounts
    app.get('/', (req, res) => {
        res.send('index');
    });

    app.get('/session', (req, res) => {
        res.send(req.session);
    });

    // Routs
    app.use('/api/serverList', require('../api/serverList'));

    // Start server
    app.listen(port, () => console.log(`-> Server started on port: ${port}`));
};  