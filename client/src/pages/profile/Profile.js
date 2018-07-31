import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ServerTABLE from '../serverlist/ServerListTABLE';
import cfg from '../../cfg/cfg';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.location.search.split('?token=')[1],
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
            }));
    };

    render() {
        console.log(this.state)
        return (
            <div className="Profile">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
                <Header />
                <main className="container-fluid">
                    <div className="bg-warning row my-2">
                        <img className="img-fluid" alt="Profile_Avatar" src={this.state.user.avatar} />
                        <div className="p-2">
                            <h2>{this.state.user.name}</h2>
                            <h4>SteamID: {this.state.user.steamid}</h4>
                        </div>
                    </div>

                    <ServerTABLE servers={{ serverList: this.state.user.servers }} />
                </main>
                <Footer />
            </div>
        );
    };
};

export default Profile;