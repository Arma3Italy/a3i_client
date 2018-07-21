import React, { Component } from 'react';

class ServerListBUTTON extends Component {
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

    listItem(servers) {
        const sl = servers.map(i => (
            <div className="col-12 col-md-6 col-lg-4" key={String(i.addr)}>
                <div className="card serverBlock mb-4 bg-dark">
                    <a rel="noopener noreferrer" href={`/server/${i.addr}`}><img src={i.img} alt="imgServerBanner" className="card-img-top" /></a>
                    <div className="card-body">
                        <h5 className="card-title">{this.serverStatusChecker(i)} <span className="badge badge-warning">{i.gametype === undefined ? 'NONE' : i.gametype}</span>  {i.name} </h5>
                        <p className="m-0 mappa">Mappa: <span className="text-warning"> {i.map} </span></p>
                        <p className="m-0 players">Players: <span className="text-warning"> {i.players}/{i.max_players} </span></p>
                    </div>
                    <div className="card-footer text-muted">
                        IP: <span className="text-warning"> {i.addr.split(':')[0]}:{i.gameport} </span>
                            <a rel="noopener noreferrer" href="#" className="text-warning"> <i className="fas fa-copy"></i></a> 
                            <a rel="noopener noreferrer" className="float-right" href={`steam://run/107410//-connect=${i.addr.split(':')[0]}:${i.gameport}`}> <i className="fas fa-sign-in-alt"></i> </a>
                    </div>
                </div>
            </div>
        ));

        return sl;
    };

    componentWillReceiveProps(props) {
        this.setState({ servers: props.servers.serverList });
    };

    render() {
        return (
            <div className="serverBOX row">
                { this.listItem(this.state.servers) }
            </div>
        );
    };
};

export default ServerListBUTTON;