const express = require('express');
const route = express.Router();





/*
* @route    GET api/register/
* @desc     Access to all users
* @access   Public
*/
route.get('/', (req, res) => {
    res.send('REGISTER');
});




module.exports = route;