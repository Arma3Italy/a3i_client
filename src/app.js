module.exports = function () {
    const express = require('express');
    const app = express();
    const port = 8888 || process.env.PORT;

    // Connecction to DB
    const mongoose = require('mongoose');
    const mongoConnection = require('../cfg/keys.json').mongodb;

    mongoose.connect(mongoConnection).then(() => console.log('-> Database MongoDB Connected')).catch(err => console.log(`-> Database error: ${err}`));

    // Settings
    app.use('/', express.static('static'));
    app.set('view engine', 'pug');
    app.set('views', './views');

    // Main Rounts
    app.get('/', (req, res) => {
        res.send('hey');
    });

    // Routs
    app.use('/api/serverList', require('../api/serverList/apiServerList'));
    app.use('/api/login', require('../api/auth/login'));
    app.use('/api/register', require('../api/auth/register'));


    // Start server
    app.listen(port, () => console.log(`Server started on -> ${port}`));
};  