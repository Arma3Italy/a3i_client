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
            user: {}
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
                user: user._doc,
                loader: 'none'
            }))
            .catch((e) => console.log('Fetch error -> ' + e));
    };

    loadProfile(user) {
        let res;
        if (user !== undefined && Object.keys(user).length !== 0 ) {
            res = (
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
                        <a className="col-5 col-md-10 btn btn-primary text-light m-2">Modifica Profilo</a>
                        <a className="col-5 col-md-10 btn btn-primary text-light m-2" href="/edit/server">Aggiugi Server</a>
                    </div>
                </div>
            );
        } else {
            res = ( <div> </div> );
        };

        return res;
    }

    render() {
        console.log(this.state)
        return (
            <div className="Profile">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
                <Loader type={this.state.loader}/>
                <Header />
                <main className="container">
                    { this.loadProfile(this.state.user) }

                    <ServerTABLE servers={{ serverList: this.state.user.servers }} />
                </main>
                <Footer />
            </div>
        );
    };
};

export default Profile;