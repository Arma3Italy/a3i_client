export default {
    serverApp: {
        protocol: 'http://',
        host: 'localhost',
        port: 8888
    },
    clientApp: {
        protocol: 'http://',
        host: 'localhost',
        port: 3000,
        routes: {
            home: { name: 'Home', url: '' },
            steamgroup: { name: 'Steam Group', url: 'https://steamcommunity.com/groups/A3ITA' },
            discord: { name: 'Discord', url: 'https://discord.gg/R4d5HBB' },
            serverlist: { name: 'Server List', url: 'serverlist' },
            profile: { name: 'LOGIN', url: 'profile' }
        }
    }
};