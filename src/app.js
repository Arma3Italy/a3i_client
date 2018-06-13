module.exports = function () {
    const express = require('express');
    const app = express();
    const port = 8888 || process.env.PORT;

    app.use('/', express.static('static'));
    app.set('view engine', 'pug');
    app.set('views', './views');

    app.get('/', (req, res) => {
        res.send('hey');
    });

    app.use('/api/serverList', require('../api/serverList/apiServerList'));


    app.listen(port, () => console.log(`Server started on -> ${port}`));
};  