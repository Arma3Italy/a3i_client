const express = require('express');
const route = express.Router();

const steamLogin = require('steam-login');

// const mongoose = require('mongoose');
const User = require('../models/UserModel');

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
	User.findOne({ steamid: req.user.steamid }).then(user => {
        let newUser = new User();
        if (!user) {
            newUser.user = req.user.username;
            newUser.steamid = req.user.steamid;
            newUser.avatar = req.user.avatar.large;
        };
        require('https').request(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${require('../cfg/keys.json').steamTOKEN}&steamid=${req.user.steamid}&format=json`, respon => {
            let op = '';
            respon.on('data', data => op += data);
            respon.on('end', () => {
                op = JSON.parse(op).response.games.find(it => it.appid == 107410) ? true : false;
                newUser.hasArma = op;
                // return res.json(newUser);
                newUser.save();
                return res.redirect('/');
            })
        }).on('error', (e) => { console.error(e) }).end();
    });
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