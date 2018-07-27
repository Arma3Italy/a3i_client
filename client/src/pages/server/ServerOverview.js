import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ServerChangLogs from '../Cards';
import ServerInfoTable from '../Table';
import ServerSocialLinks from '../Social';

import { Line } from 'react-chartjs-2';


class ServerOverview extends Component {
    constructor(props) {
        super(props);

        this.state = { serverID: props.match.params.id, server: {}, data: {}, changeLogs: [{
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
        }] };
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
                plyrank = plyrank.filter((stat, index) => index % step === 0 && index < step*numShowStats ? true : false);
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


                            <ServerInfoTable title='Informazioni' data={[
                                { head: 'Nome', body: server.name },
                                { head: 'IP', body: server.addr },
                                { head: 'Giocatori', body: server.players },
                                { head: 'Server', body: (server.dedicated === true ? 'Dedicato' : 'Hostato') },
                                { head: 'Sistema Operativo', body: (server.os === 'w' ? (<span><i className="fab fa-windows"></i> Windows</span>) : (<span><i className="fab fa-linux"></i> Linux</span>)) },
                                { head: 'Modalità di gioco', body: server.gametype },
                                { head: 'Difficotà', body: server.difficulty },
                                { head: 'BattleEye', body: (server.battleeye === true ? 'Attivo' : 'Disattivo') },
                                { head: 'Posizione', body: (server.country === undefined ? 'Sconosciuta' : server.country) },
                                { head: 'Versione', body: server.version },
                                { head: 'Proprietario', body: (server.serverClaim === undefined ? 'Non definito' : server.serverClaim.map(proprietario => <a className="mx-1" href="#">{proprietario}</a>)) }
                            ]} />
                            

                            <ServerSocialLinks title='Social' data={[
                                { name: 'teamspeak', icon: 'fab fa-teamspeak', link: 'https://www.teamspeak.com/en/' },
                                { name: 'discord', icon: 'fab fa-discord', link: 'https://discordapp.com/' },
                                { name: 'facebook', icon: 'fab fa-facebook', link: 'https://www.facebook.com/' },
                                { name: 'youtube', icon: 'fab fa-youtube', link: 'https://www.youtube.com/?gl=IT&hl=it' },
                                { name: 'twitch', icon: 'fab fa-twitch', link: 'https://www.twitch.tv/directory/following' },
                                { name: 'steam', icon: 'fab fa-steam', link: 'http://steamcommunity.com/id/xedom/' },
                                { name: 'site', icon: 'fas fa-globe-africa', link: 'http://xedom.altervista.org/' },
                                { name: 'forum', icon: 'fas fa-users', link: 'https://forum.octafox.it/' }
                            ]} />
                            

                            <div className="desc col-12 my-3">
                                <h3>Descrizione</h3>
                                <div className="content">
                                    <p> {server.desc} </p>
                                </div>
                            </div>

                            
                            <ServerChangLogs title='ChangeLogs' data={this.state.changeLogs} />


                        </div>

                    </main>
                    <Footer />
                </div>
            );
        };
    };
};


export default ServerOverview;