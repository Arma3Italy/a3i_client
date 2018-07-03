import React, { Component } from 'react';

class ServerListTABLE extends Component {
    constructor(input) {
        super();
        this.state = {
            servers: input.servers
        };
    };

    listItem() {
        const sl = this.state.servers.map(i => (
            <div className="ST_body row bg-light text-dark p-2 border-bottom" key={String(i.ip)}>
                <div className="col-lg-1 d-none d-lg-block text-center">{i.rank}</div>
                <div className="col-6 col-lg-4 text-wrap">{i.nome}</div>
                <div className="col-6 col-lg-3">{i.ip} <a rel="noopener noreferrer" href="/" className="text-warning"><i className="fas fa-copy"></i></a></div>
                <div className="col-lg-2 d-none d-lg-block text-center">{i.map}</div>
                <div className="col-lg-1 d-none d-lg-block text-center">{i.players}/{i.maxPlayers}</div>
                <div className="col-lg-1 d-none d-lg-block text-center"><a rel="noopener noreferrer" href="/"><i className="fas fa-sign-in-alt"></i></a></div>
            </div>
        ));

        return sl;
    };

    render() {
        return (
            <div className="serverTABLE">
                <div className="ST_head row bg-dark p-2">
                    <div className="col-lg-1 d-none d-lg-block text-center">Rank</div>
                    <div className="col-6 col-lg-4 text-wrap">Nome</div>
                    <div className="col-6 col-lg-3">IP</div>
                    <div className="col-lg-2 d-none d-lg-block text-center">Mappa</div>
                    <div className="col-lg-1 d-none d-lg-block text-center">Players</div>
                    <div className="col-lg-1 d-none d-lg-block text-center">Entra</div>
                </div>

                { this.listItem() }
            </div>
        );
    };
};

export default ServerListTABLE;