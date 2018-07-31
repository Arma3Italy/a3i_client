import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ServerTABLE from '../serverlist/ServerListTABLE';
import Loader from '../Loader';
import cfg from '../../cfg/cfg';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.location.search.split('?token=')[1],
            loader: 'full',
            user: {
                name: 'Debian',
                avatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e6/e6759921dc6e1c4622731900793c1e625067301a_full.jpg'
            }
        };
    };

    componentDidMount() {
        fetch(`${cfg.serverApp.protocol}${cfg.serverApp.host}:${cfg.serverApp.port}/api/login/user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: this.state.token
            })
        })
            .then(data => data.json())
            .then(user => this.setState({
                user: user._doc
            }))
            .catch((e) => console.log('Fetch error -> ' + e));
    };

    render() {
        console.log(this.state)
        if (this.state.user.servers !== undefined) {
            return (
                <div className="Profile">
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
                    <Header />
                    <main className="container-fluid">
                        <div className="row my-2">
                            <div className="col-12 col-md-4 m-0 p-0">
                                <img className="img-fluid m-0 p-0 rounded mx-auto d-block" alt="Profile_Avatar" src={this.state.user.avatar} />
                            </div>
                            <div className="col-12 col-md-4 p-2 text-center">
                                <h2>{this.state.user.name}</h2>
                                <h6>SteamID: {this.state.user.steamid}</h6>
                                <h6>Servers: {this.state.user.servers.length}</h6>
                            </div>
                            <div className="col-12 col-md-4 text-center">    
                                <a className="btn btn-primary text-light m-2">Modifica Profilo</a>
                                <a className="btn btn-primary text-light m-2">Aggiugi Server</a>
                            </div>
                        </div>
    
    
                        <ServerTABLE servers={{ serverList: this.state.user.servers }} />
                    </main>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div className="Profile">
                    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
                    <Loader type={this.state.loader}/>
                    <Header />
                    
                    <Footer />
                </div>
            );
        };
    };
};

export default Profile;