import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ServerListTABLE from './ServerListTABLE';
import ServerListBUTTON from './ServerListBUTTON';
import BG from '../BG';
import '../../bootstrap.min.css';

class ServerListPage extends Component {
    constructor() {
        super();

        this.state = {
            serverOverView: 'table', //  table - button
            servers: { 
                serverCount: 47,
                serverList: [
                    { rank: 1, nome: '[ITA] LessLife | ts3: ts.lesslife.it', ip: '51.38.114.224:2302', img: 'img/bannerServers/SIGBanner.jpg', map: 'Altis', players: 47, maxPlayers: 214 },
                    { rank: 143, nome: '[ITA] CosaNostra | ts3: ts.cosanostra.it', ip: '78.236.64.4:2302', img: 'img/bannerServers/qcs.jpg', map: 'Altis', players: 95, maxPlayers: 120 },
                    { rank: 2, nome: '[ITA] AltisLifeItaliaReloaded | ts3: ts.alir.it', ip: '34.35.563.24:2302', img: 'img/bannerServers/alir.jpg', map: 'Altis', players: 12, maxPlayers: 142 },
                    { rank: 72, nome: '[ITA] FutureLife | ts3: ts.futurelife.it', ip: '35.3.5.25:2302', img: 'img/bannerServers/lossantosFuture.jpg', map: 'Altis', players: 2, maxPlayers: 60 }
                ],
                serverUpdate: 1531093617131
            },
            filter: ""
        };


        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        fetch('http://localhost:8888/api/serverlist', {
            method: 'get'
        }).then(res => res.json()).then(data => this.updateServerList(data));

        // this.updateServerList = this.updateServerList.bind(this);
    };

    updateServerList(server) {
        this.setState({
            servers: server
        });
        console.log(this.state);
    };

    renderServers(overviewType) {
        if (this.state.serverOverView === 'table') {
            return <ServerListTABLE servers={this.state.servers} />;
        } else if (this.state.serverOverView === 'button') {
            return <ServerListBUTTON servers={this.state.servers} />;
        };
        return <h1 style={{ backgroundColor: 'red', padding: '10px' }}>Error -> {this.state.serverOverView}</h1>
    };

    changeOverview(type) {
        this.setState({ serverOverView: type });
    };

    render() {
        return (
            <div className="ServerListPage">
                <Header />
                <BG />
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
                <main className="container">
                    <h1>Server List</h1>
                    <p>Ecco la lista dei server italiani, scelti in base a queste TAG: [ITA] - ITALIA - Italia - ITA - ita - [IT] - [ITA/EU] - [EU/ITA] - [ALIR]. Se il tuo server non è presente nella lista contatta lo STAFF.</p>

                    <div id="serverViewOptions" className="m-2 text-right">
                        <form action="#">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-secondary text-light">Search</span>
                                </div>

                                <input type="text" name="filter" value={this.state.filter} className="form-control" onChange={this.updateFilter} />

                                <div className="input-group-append">
                                    <a className={ 'btn text-light ' + (this.state.serverOverView === 'table' ? 'btn-warning' : 'btn-dark') } onClick={ () => { this.changeOverview('table') }}> <i className="fas fa-th-list"></i> </a>
                                    <a className={ 'btn text-light ' + (this.state.serverOverView === 'button' ? 'btn-warning' : 'btn-dark') } onClick={ () => { this.changeOverview('button') }}> <i className="fas fa-th-large"></i> </a>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="servers text-light">{this.renderServers()}</div>

                </main>
                <Footer />
            </div>
        );
    };
};

export default ServerListPage;