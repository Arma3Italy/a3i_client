const express = require('express');
const route = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');

const keys = require('../cfg/cfg');
var redirectBack = [];
var returnToken = '';
var steamToken = '';

const openid = require('openid');
const opt = {
    verify: `${keys.serverApp.protocol}${keys.serverApp.host}:${keys.serverApp.port}/api/login/verify`,
    realm: `${keys.serverApp.protocol}${keys.serverApp.host}:${keys.serverApp.port}/api/login/`,
    url: 'https://steamcommunity.com/openid'
};
const relyingParty = new openid.RelyingParty(opt.verify, opt.realm, true, true, []);


route.get('/verify', (req, res, next) => {
    relyingParty.verifyAssertion(req, (err, result) => {
        if (err) return next(err.message);
        if (!result || !result.authenticated) return next('Failed to authenticate user.');
        if (!/^https?:\/\/steamcommunity\.com\/openid\/id\/\d+$/.test(result.claimedIdentifier)) return next('Claimed identity is not valid.');
        steamToken = result.claimedIdentifier.split('/id/')[1];
        returnToken = jwt.sign({ id: steamToken }, keys.jwt.secret, { algorithm: "HS256" } );

        next();
    });
}, (req, res) => {
    // save db

    // info --> http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=FD144A6CC13154901CE1AC0F9111BAD1&steamids=76561198101277076
    // TODO: save user to database

    axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${keys.steam.apikey}&steamids=${steamToken}`)
        .then(datau => {
            const newUser = {};

            newUser.steamid = datau.data.response.players[0].steamid;
            newUser.name = datau.data.response.players[0].personaname;
            newUser.avatar = datau.data.response.players[0].avatarfull;
            newUser.primaryclanid = datau.data.response.players[0].primaryclanid;

            axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${keys.steam.apikey}&steamid=${steamToken}&format=json`)
                .then(datag => {
                    newUser.arma = datag.data.response.games.filter(games => games.appid === keys.steam.armaid).length === 1 ? true : false;

                    console.log(newUser)
                });

        });

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

module.exports = route;