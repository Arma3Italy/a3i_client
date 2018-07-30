import React, { Component } from 'react';
import Header from '../Header';
import Footer from '../Footer';
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
        // TODO: create post request to backend with token to get user data
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
                <main className="container-fluid my-3">
                    <div className="row">
                        <div>
                            <img className="img-fluid m-0 p-0" alt="Profile_Avatar" src={this.state.user.avatar} />
                            <h2 className="text-center">{this.state.user.name}</h2>
                        </div>

                    </div>
                </main>
                <Footer />
            </div>
        );
    };
};

export default Profile;