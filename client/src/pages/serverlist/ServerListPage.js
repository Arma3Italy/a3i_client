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
                    { name: '[ITA] LessLife | ts3: ts.lesslife.it', addr: '51.38.114.224:2302', img: 'img/bannerServers/SIGBanner.jpg', map: 'Altis', players: 47, max_players: 214, rank: [ { like: [ 2, 23, 4]} ]},
                    { name: '[ITA] CosaNostra | ts3: ts.cosanostra.it', addr: '78.236.64.4:2302', img: 'img/bannerServers/qcs.jpg', map: 'Altis', players: 95, max_players: 120, rank: [ { like: [ 2, 23, 4]} ]},
                    { name: '[ITA] AltisLifeItaliaReloaded | ts3: ts.alir.it', addr: '34.35.563.24:2302', img: 'img/bannerServers/alir.jpg', map: 'Altis', players: 12, max_players: 142, rank: [ { like: [ 2, 23, 4]} ]},
                    { name: '[ITA] FutureLife | ts3: ts.futurelife.it', addr: '35.3.5.25:2302', img: 'img/bannerServers/lossantosFuture.jpg', map: 'Altis', players: 2, max_players: 60, rank: [ { like: [ 2, 23, 4]} ]}
                ],
                serverUpdate: 1531093617131
            },
            filter: ""
        };

    };

    updateServerList(server) {
        this.setState({
            servers: server
        });
    };

    renderServers() {
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

    componentWillMount() {
        fetch('http://localhost:8888/api/serverlist', {
            method: 'get'
        }).then(res => res.json()).then(data => this.updateServerList(data));
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