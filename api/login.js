const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');

const keys = require('../cfg/cfg');
const User = require('../models/UserModel');

var redirectBack = [];
var returnToken = '';

const openid = require('openid');
const opt = {
    verify: `${keys.serverApp.protocol}${keys.serverApp.host}:${keys.serverApp.port}/api/login/verify`,
    realm: `${keys.serverApp.protocol}${keys.serverApp.host}:${keys.serverApp.port}/api/login/`,
    url: 'https://steamcommunity.com/openid'
};
const relyingParty = new openid.RelyingParty(opt.verify, opt.realm, true, true, []);

route.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

route.get('/verify', (req, res, next) => {
    relyingParty.verifyAssertion(req, (err, result) => {
        if (err) return next(err.message);
        if (!result || !result.authenticated) return next('Failed to authenticate user.');
        if (!/^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/.test(result.claimedIdentifier)) return next('Claimed identity is not valid.');
        const steamToken = result.claimedIdentifier.split('/id/')[1];
        axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${keys.steam.apikey}&steamids=${steamToken}`)
        .then(datau => {
            User.findOne({ steamid: steamToken }, (err, user) => {
                if (user) {
                    returnToken = jwt.sign({ dbid: user.id, sid: user.steamid, pid: user.primaryclanid }, keys.jwt.secret);
                    next();
                } else {
                    const newUser = new User();

                    newUser.steamid = datau.data.response.players[0].steamid;
                    newUser.name = datau.data.response.players[0].personaname;
                    newUser.avatar = datau.data.response.players[0].avatarfull;
                    newUser.primaryclanid = datau.data.response.players[0].primaryclanid;
    
                    axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.steam.apikey}&steamid=${steamToken}&format=json`)
                        .then(datag => {
                            newUser.arma = datag.data.response.games.filter(games => games.appid === keys.steam.armaid).length === 1 ? true : false;
                            newUser.save(() => {
                                returnToken = jwt.sign({ dbid: newUser.id, sid: newUser.steamid, pid: newUser.primaryclanid }, keys.jwt.secret);
                                next();
                            });
                        });
                };
            });
        });
    });
}, (req, res) => {
    res.redirect(`${redirectBack[0]}://${redirectBack[1]}:${redirectBack[2]}/${redirectBack[3]}?token=${returnToken}`);
});

route.get('/:returnurlback', (req, res) => {
    redirectBack = req.params.returnurlback.split('_');
    relyingParty.authenticate(opt.url, false, (err, authURL) => {
        if (err) { console.log(err); return next('Authentication failed: ' + err); };
        if (!authURL) return next('Authentication failed: authURL');
        res.redirect(authURL);
    });
});

route.post('/user', (req, res) => {
    jwt.verify(req.body.token, keys.jwt.secret, (err, data) => {
        if (err || !data) {
            return res.json({ error: 'Token error' });
        } else {
            User.findOne({ steamid: data.sid }, (e, user) => {
                if (err) {
                    return res.json({ error: 'Database error' })
                } else {
                    if (user) {
                        return res.json({ ...user });
                    } else {
                        return res.json({ error: 'User not found' });
                    };
                };
            });
        };
    });
});

module.exports = route;