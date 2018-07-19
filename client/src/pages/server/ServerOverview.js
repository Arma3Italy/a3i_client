import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';


class ServerOverview extends Component {
    constructor(props) {
        super(props);

        this.state = { serverID: props.match.params.id, server: {} };
    };

    componentDidMount() {
        fetch(`http://localhost:8888/api/serverlist/ip?address=${this.state.serverID.split(':')[0]}&port=${this.state.serverID.split(':')[1]}`)
            .then(data => data.json())
            .then(server => this.setState({server}))
    };

    render() {
        const { server } = this.state;

        if(server !== undefined) {
            return(
                <div className="ServerOverview">
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
                    <Header />
                    <main className="container my-3">
                        <img className="img-fluid" src={'/'+server.img} alt={server.img}/>
                        <h1 className="text-center">{server.name}</h1>

                        <div className="row">
                            <div className="info col-md-7">
                                <h3>Informazioni</h3>
                                <div className="content">
                                    <table class="table table-dark table-sm">
                                        <tbody>
                                            <tr> <td>Nome</td> <td>{server.name}</td> </tr>
                                            <tr> <td>IP</td> <td>{server.addr}</td> </tr>
                                            <tr> <td>Giocatori</td> <td>{server.players}</td> </tr>
                                            <tr> <td>Server</td> <td>{server.dedicated === true ? 'Dedicato' : 'Hostato'}</td> </tr>
                                            <tr> <td>Sistema Operativo</td> {server.os === 'w' ? (<td><i class="fab fa-windows"></i> Windows</td>) : (<td><i class="fab fa-linux"></i> Linux</td>)}</tr>
                                            {/* <tr> <td>Modalità di gioco</td> <td>{server.gametype.GameType}</td> </tr> */}
                                            {/* <tr> <td>Difficotà</td> <td>{server.gametype.Difficulty}</td> </tr> */}
                                            {/* <tr> <td>BattleEye</td> <td>{server.gametype.BattleEye === 't' ? 'Attivo' : 'Disattivo'}</td> </tr> */}
                                            <tr> <td>Versione</td> <td>{server.version}</td> </tr>
                                            <tr> <td>Proprietario</td> <td>{server.serverClaim}</td> </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="links col-md-4">
                                <h3>Links</h3>
                                <div className="content">
                                    <a href="#" className="btn btn-secondary m-2"> TeamSpeak3 </a>
                                    <a href="#" className="btn btn-secondary m-2"> Discord </a>
                                    <a href="#" className="btn btn-secondary m-2"> Forum </a>
                                    <a href="#" className="btn btn-secondary m-2"> Facebook </a>
                                    <a href="#" className="btn btn-secondary m-2"> YouTube </a>
                                    <a href="#" className="btn btn-secondary m-2"> Twitch </a>
                                    <a href="#" className="btn btn-secondary m-2"> Sito </a>
                                    <a href="#" className="btn btn-secondary m-2"> Steam </a>
                                </div>
                            </div>
                            
                            <div className="desc col-12">
                                <h3>Descrizione</h3>
                                <div className="content">
                                    <p> {server.desc} </p>
                                </div>
                            </div>
                            
                            <div className="changelog col-12">
                                <h3>ChangeLog</h3>
                                <div className="content">
                                    <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu cursus nisi. Vivamus ac molestie libero. Aliquam ut ex erat. Vivamus ultricies ut lacus sit amet euismod. Morbi varius vel tellus nec ornare. Etiam scelerisque vel eros a finibus. Morbi facilisis turpis nec commodo bibendum. Integer sed ligula et enim sollicitudin convallis. Mauris porta orci ac interdum imperdiet. Nam sit amet justo blandit est commodo tristique in vel tortor. In tristique laoreet diam ac fermentum. Etiam scelerisque viverra erat, eget sagittis lorem viverra nec.</p>
                                </div>
                            </div>
                        </div>

                    </main>
                    <Footer />
                </div>
            );
        } else {
            return ( <div> LOADING . . . </div> )
        };
    };
};


export default ServerOverview;