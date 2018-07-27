const User = require('../models/UserModel');
const https = require('https');
const fetch = https.request;
const cfg = require('../cfg/cfg');
const axios = require('axios');

function fetchAPI ( url, cb ) {
    axios.get(url)
        .then(response => cb(undefined, response.data))
        .catch(err => cb(err, {}));
};

function steamApiUserGameList( steamid ) {
    return `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${cfg.steam.apikey}&steamid=${steamid}&format=json`;
};

function initUserDB( userData ) {
    User.findOne({ steamid: userData.steamid }).then(user => {

        let userDB = user ? user : newUserDB( new User(), userData );

        fatchGame( userDB, userData, ( cbUserDB ) => {
            cbUserDB.save();
        });

    });
};

function newUserDB( user, userInfo ) {

    user.user = userInfo.username;
    user.steamid = userInfo.steamid;
    user.avatar = userInfo.avatar.large;

    return user;

};

function fatchGame( userDB, userData, cb ) {

    fetchAPI(steamApiUserGameList( userData.steamid ), (err, responde) => {
        if (!err) {
            userDB.hasArma = responde.response.games.map(x => x.appid).includes( 107410 );
            cb(userDB); 
        };
    });

};

function updateUserDB( newData ) {
};

function deleteUserDB( userData, cb ) {
    User.findOneAndRemove({ steamid: userData.steamid }, (err) => {
        if (!err) cb();
    })
};

module.exports = { initUserDB, deleteUserDB };