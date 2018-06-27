const express = require('express');
const route = express.Router();
const steamLogin = require('steam-login');
const { initUserDB, deleteUserDB } = require('../src/dbfnc');

route.get('/', (req, res) => {
    res.send();
});

/**
 *   @route    GET api/login/auth
 *   @desc     Access point to login with steam
 *   @access   Public
 */
route.get('/auth', steamLogin.authenticate());

/**
 *   @route    GET api/login/verify
 *   @desc     Verify steam account
 *   @access   Public
 */
route.get('/verify', steamLogin.verify(), function(req, res) {

    initUserDB(req.session.steamUser);
	res.redirect('/');

});

/**
 *   @route    GET api/login/delete
 *   @desc     
 *   @access   Public
 */
route.get('/delete', function(req, res) {
    if (req.session.steamUser) {
        deleteUserDB(req.session.steamUser, (err) => {
            res.redirect('/api/login/logout');
        });
    } else {
        res.redirect('/api/login/auth');
    }
});

/**
 *   @route    GET api/login/logout
 *   @desc     Logout from steam
 *   @access   Public
 */
route.get('/logout', steamLogin.enforceLogin('/'), function(req, res) {
	req.logout();
	res.redirect('/');
});


module.exports = { route };