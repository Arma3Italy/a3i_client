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

    createChangeLog( arrayChangeLog ) {
        arrayChangeLog = arrayChangeLog.map(changeLog => (
            <div className="card m-2 col-lg-3">
                <div className="card-body">
                    <h5 className="card-title">{changeLog.title}</h5>
                    <p class="card-text">{changeLog.body}</p>
                    <p class="card-text"><small class="text-muted">{changeLog.date}</small></p>
                </div>
            </div>
        ));

        return arrayChangeLog;
    }

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
                            <div className="info col-lg-7 my-3">
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
                            
                            <div className="links col-lg-4 my-3">
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
                            
                            <div className="desc col-12 my-3">
                                <h3>Descrizione</h3>
                                <div className="content">
                                    <p> {server.desc} </p>
                                </div>
                            </div>
                            
                            <div className="changelog col-12 my-3">
                                <h3>ChangeLog</h3>
                                <div className="content row">
                                    {this.createChangeLog([
                                        {
                                            title: 'aggiornamento #1',
                                            body: 'questo è un aggiornamento per fixare molti bug segnalati dalla community',
                                            date: '18.07.2018'
                                        },
                                        {
                                            title: 'aggiornamento #2',
                                            body: 'aggiunti scirpt per la polizia e i medici, in brave verrano aggiunte anche le skin',
                                            date: '12.02.2018'
                                        },
                                        {
                                            title: 'aggiornamento #3',
                                            body: 'abbiamo aggiunto nuove skin per le uniformi e i veicoli',
                                            date: '05.06.2018'
                                        },
                                        {
                                            title: 'aggiornamento #4',
                                            body: 'aggiunti nuovi script e nuove interfacce per gli shop, aggiunta anche una base per 3 gang e aggiornata la mappa con nuove strutture',
                                            date: '21.01.2018'
                                        }
                                    ])}
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