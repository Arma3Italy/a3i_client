const path = require('path');

module.exports = {
    serverApp: {
        protocol: 'http://',
        host: 'localhost',
        port: 8888
    },
    steam: {
        apikey: 'FD144A6CC13154901CE1AC0F9111BAD1',
        serverListCFG: {
            filters: "\\appid\\107410\\name_match\\*",
            limit: "20000",
            reFilters: "((^ita\\s)|(\\sita\\s)|(\\s?italia?\\s?)|(\\[ita(\/?[a-zA-Z]+)?\\]))",
            updateTime: 5,
            daysExpireOffServer: 2,
            dbDir: path.resolve(__dirname, '..', 'db'),
            dbServerListFile: 'serverList.json'
        }
    },
    mongo: {
        url: 'mongodb://admin:admin123@ds261660.mlab.com:61660/arma3italy'
    },
    session: {
        secret: 'sessionKeyxxxSicret'
    },
    jwt: {
        secret: '5DBFkDUowY6hZZc2LZxjsij2w'
    }
};