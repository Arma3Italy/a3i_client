import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';

import { Line } from 'react-chartjs-2';


class ServerOverview extends Component {
    constructor(props) {
        super(props);

        this.state = { serverID: props.match.params.id, server: {}, data: {} };
    };

    componentDidMount() {
        fetch(`http://localhost:8888/api/serverlist/ip?address=${this.state.serverID.split(':')[0]}&port=${this.state.serverID.split(':')[1]}`)
            .then(data => data.json())
            .then(server => this.setState({server}))
            .then(() => {
                let plyrank = this.state.server.plyrank;

                const timeframe = 7;
                plyrank = plyrank.filter(stat => stat.time > Date.now() - ( timeframe*24*60*60*1000 ));
                plyrank.sort((uno, due) => uno.time - due.time);
                plyrank.reverse();

                const numShowStats = 20;
                const step = Math.floor(plyrank.length / numShowStats);
                plyrank = plyrank.filter((stat, index) => index % step == 0 && index < step*numShowStats ? true : false);
                plyrank.reverse();

                const colorChart = '#fa2';
                this.setState({
                    data: {
                        labels: plyrank.map(x => new Date(x.time).toDateString()),
                        datasets: [{
                            label: 'Giocatori ONLINE',
                            data: plyrank.map(x => x.ply),
                            borderWidth: 2,
                            fill: false,
                            borderColor: 'rgba(255, 170, 34,1)',
                            backgroundColor: 'rgba(255, 170, 34,0.6)',
                            pointBackgroundColor: 'rgba(255, 170, 34,1)',
                            pointBorderColor: 'rgba(255, 170, 34,1)'
                        }],
                    }
                });
            });
    };

    createChangeLog( arrayChangeLog ) {
        arrayChangeLog = arrayChangeLog.map(changeLog => (
            <div className="card m-2 col-lg-3" key={changeLog.title} >
                <div className="card-body">
                    <h5 className="card-title">{changeLog.title}</h5>
                    <p className="card-text">{changeLog.body}</p>
                    <p className="card-text"><small className="text-muted">{changeLog.date}</small></p>
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
                        <img className="img-fluid rounded-top" src={'/'+server.img} alt={server.img}/>
                        <h3 className="bg-dark text-light p-3 text-center rounded-bottom">{server.name}</h3>

                        <div className="row">

                            <div className="playerStatistis col-12">
                                <h3>Giocatori</h3>
                                <Line data={this.state.data} options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    layout: { padding: { left: 0, right: 0, top: 0,  bottom: 0 } },
                                    legend: { display: false },
                                    scales: { xAxes: [{ display: false }], yAxes: [{ display: false }] }
                                }} height='50px' />
                            </div>


                            <div className="info col-lg-7 my-3">
                                <h3>Informazioni</h3>
                                <div className="content">
                                    <div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Nome</div> <div className="bg-light text-dark col-8 rounded-right">{server.name}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">IP</div> <div className="bg-light text-dark col-8 rounded-right">{server.addr}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Giocatori</div> <div className="bg-light text-dark col-8 rounded-right">{server.players}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Server</div> <div className="bg-light text-dark col-8 rounded-right">{server.dedicated === true ? 'Dedicato' : 'Hostato'}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Sistema Operativo</div> {server.os === 'w' ? (<div className="bg-light text-dark col-8 rounded-right"><i className="fab fa-windows"></i> Windows</div>) : (<div className="bg-light text-dark col-8 rounded-right"><i className="fab fa-linux"></i> Linux</div>)}</div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Modalità di gioco</div> <div className="bg-light text-dark col-8 rounded-right">{server.gametype}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Difficotà</div> <div className="bg-light text-dark col-8 rounded-right">{server.difficulty}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">BattleEye</div> <div className="bg-light text-dark col-8 rounded-right">{server.battleeye === true ? 'Attivo' : 'Disattivo'}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Posizione</div> <div className="bg-light text-dark col-8 rounded-right">{server.country === undefined ? 'Sconosciuta' : server.country}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Versione</div> <div className="bg-light text-dark col-8 rounded-right">{server.version}</div> </div>
                                        <div className="row shadow my-1"> <div className="bg-dark text-light col-4 rounded-left">Proprietario</div> <div className="bg-light text-dark col-8 rounded-right">{server.serverClaim === undefined ? 'Non definito' : server.serverClaim.map( proprietario => <a className="mx-1" href="#">{ proprietario }</a> ) }</div> </div>
                                    </div>
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
        };
    };
};


export default ServerOverview;