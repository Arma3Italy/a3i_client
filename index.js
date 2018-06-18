const web = require('./src/app.js')();

const serverUpdater = require('./src/serverBrowser.js').serverListUpdater;
// setInterval(serverUpdater, 9000);