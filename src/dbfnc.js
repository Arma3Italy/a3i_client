const User = require('../models/UserModel');
const https = require('https');
const fetch = https.request;
const cfg = require('../cfg/keys.json');

const { fetchAPI } = require('./fnc');

function steamApiUserGameList( steamid ) {
    return `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${cfg.steamTOKEN}&steamid=${steamid}&format=json`;
};

function findGame( gameID, userID ) {

    return fetchAPI(steamApiUserGameList( userID ), (err, responde) => {
        if (!err) {
            console.log( responde.response.games.map(x => x.appid).includes( gameID ) );
        };
    });

};

function initUserDB( userData ) {
    User.findOne({ steamid: userData.steamid }).then(user => {

        findGame( 107410, userData.steamid )

    });
};

function updateUserDB(newData) {
    console.log('updateUserDB ' + newData);
};

function deleteUserDB(steamID) {
    console.log('deleteUserDB ' + steamID);
};

module.exports = { findGame, initUserDB };