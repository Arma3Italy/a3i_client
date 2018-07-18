import React, { Component } from 'react';

class ServerListTABLE extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: props.servers.serverList
        };
    };

    serverStatusChecker( server ) {
        const color = server.status === true ? " text-success": " text-danger";
        return (<i className={"fas fa-circle" + color}></i>);
    };

    listItem() {
        const sl = this.state.servers.map(i => (
            <div className="ST_body row bg-light text-dark p-2 border-bottom" key={String(i.addr)}>
                <div className="col-lg-1 d-none d-lg-block text-center">{i.rank[0].like.length}</div>
                <div className="col-6 col-lg-4 text-wrap">{this.serverStatusChecker(i)} {i.name}</div>
                <div className="col-6 col-lg-3"><a rel="noopener noreferrer" href="/" className="text-warning"><i className="fas fa-copy"></i></a> {i.addr.split(':')[0]}:{i.gameport}</div>
                <div className="col-lg-2 d-none d-lg-block text-center">{i.map}</div>
                <div className="col-lg-1 d-none d-lg-block text-center">{i.players}/{i.max_players}</div>
                <div className="col-lg-1 d-none d-lg-block text-center"><a rel="noopener noreferrer" href="/"><i className="fas fa-sign-in-alt"></i></a></div>
            </div>
        ));

        return sl;
    };

    componentWillReceiveProps(props) {
        this.setState({ servers: props.servers.serverList });
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