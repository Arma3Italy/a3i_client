import React, { Component } from 'react';
import './ServerListTABLE.css'

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

    copyToClip(text) {
        alert(text);
        // TODO: copy ip to the clip board
    };

    listItem() {
        let sl;
        if (this.state.servers === undefined || this.state.servers.length === 0) {
            sl = (
                <div className="ST_body row bg-light text-dark p-2 border-bottom">
                    <div className="col-12">
                        <p>Nessun server prova a ricaricare la pagina . . .</p>
                    </div>
                </div>
            );
        } else {
            sl = this.state.servers.map(i => (
                <div className="ST_body row bg-light text-dark p-2 border-bottom" key={String(i.addr)}>
                    <div className="col-12 col-lg-6">
                        <div className="row">
                            {/* RANK */}<div className="col-lg-1 d-none d-lg-block text-right">
                                            {i.rank[0].like.length}
                                        </div>
                            {/* NAME */}<div className="col-12 col-lg-11 text-wrap">
                                            {this.serverStatusChecker(i)} 
                                            <a href={`/server/${i.addr.split(':')[0]}:${i.gameport}`} title={i.name}>
                                                {' '}<span className="badge badge-primary">
                                                    {i.gametype === undefined ? 'NONE' : i.gametype}
                                                </span> 
                                                { window.innerWidth < 400 ? (i.name.length > 20 ? ' '+i.name.substring(0,25)+' ...' : ' '+i.name) : (i.name.length > 30 ? ' '+i.name.substring(0,35)+' ...' : ' '+i.name) }
                                            </a>
                                        </div>
                        </div>
                    </div>
    
                    <div className="col-12 col-lg-6">
                        <div className="row">
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    {/* IP */}  <div className="col-12 col-lg-7">
                                                    <i className="fas fa-copy text-warning" onClick={() => {this.copyToClip(`${' '+i.addr.split(':')[0]}:${i.gameport}`)}}></i>
                                                    {' '+i.addr.split(':')[0]}:{i.gameport}
                                                </div>
                                    {/* MAPPA */}<div className="col-lg-5 d-none d-lg-block text-center">
                                                    {i.map}
                                                </div>
                                </div>
                            </div>
    
                            <div className="col-lg-3">
                                <div className="row">
                                    {/* PLAYERS */} <div className="col-lg-7 d-none d-lg-block text-center">
                                                        {i.players}/{i.max_players}
                                                    </div>
                                    {/* RANK */}<div className="col-lg-5 d-none d-lg-block text-center">
                                                    <a rel="noopener noreferrer" href={`steam://run/107410//-connect=${i.addr.split(':')[0]}:${i.gameport}`}>
                                                        <i className="fas fa-sign-in-alt"></i>
                                                    </a>
                                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ));
        };

        return sl;
    };

    componentWillReceiveProps(props) {
        this.setState({ servers: props.servers.serverList });
    };

    render() {
        return (
            <div className="serverTABLE text-light">
                <div className="ST_head row bg-dark p-2">
                    <div className="col-8 col-lg-6">
                        <div className="row">
                            <div className="col-lg-1 d-none d-lg-block text-center">Rank</div>
                            <div className="col-12 col-lg-11 text-wrap">Nome</div>
                        </div>
                    </div>
                    

                    <div className="col-4 col-lg-6">
                        <div className="row">
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-12 col-lg-7">IP</div>
                                    <div className="col-lg-5 d-none d-lg-block text-center">Mappa</div>
                                </div>
                            </div>
                            
                            <div className="col-lg-3">
                                <div className="row">
                                    <div className="col-lg-7 d-none d-lg-block text-center">Players</div>
                                    <div className="col-lg-5 d-none d-lg-block text-center"><i className="fas fa-sign-in-alt"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                { this.listItem() }
            </div>
        );
    };
};

export default ServerListTABLE;