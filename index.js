const serverUpdater = require('./src/serverBrowser.js').serverListUpdater;
const serverUpdateTime = require('./cfg/cfg.json').serverListCFG.updateTime * (1000*60);

setInterval(serverUpdater, serverUpdateTime);

setTimeout(() => {
    const web = require('./src/app.js')();
}, 2000);