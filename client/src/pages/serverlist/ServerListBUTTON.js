import React, { Component } from 'react';

class ServerListBUTTON extends Component {
    constructor(props) {
        super(props);
        this.state = {
            servers: props.servers.serverList
        };
    };

    listItem() {
        const sl = this.state.servers.map(i => (
            <div className="col-12 col-md-6 col-lg-4" key={String(i.ip)}>
                <div className="card serverBlock mb-4 bg-dark">
                    <a rel="noopener noreferrer" href="/"><img src={i.img} alt="imgServerBanner" className="card-img-top" /></a>
                    <div className="card-body">
                        <h5 className="card-title"> {i.nome} </h5>
                        <p className="m-0 mappa">Mappa: <span className="text-warning"> {i.map} </span></p>
                        <p className="m-0 players">Players: <span className="text-warning"> {i.players}/{i.maxPlayers} </span></p>
                    </div>
                    <div className="card-footer text-muted">IP: <span className="text-warning"> {i.ip} </span> <a rel="noopener noreferrer" href="/"> <i className="fas fa-sign-in-alt"></i> </a> </div>
                </div>
            </div>
        ));

        return sl;
    };

    render() {
        return (
            <div className="serverBOX row">
                { this.listItem() }
            </div>
        );
    };
};

export default ServerListBUTTON;