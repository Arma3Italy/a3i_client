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
        return(
            <div className="ServerOverview">
                <Header />
                <main className="container my-3">
                    <img className="img-fluid" src={'/'+server.img} alt={server.img}/>
                    <h1 className="text-center">{server.name}</h1>
                    

                </main>
                <Footer />
            </div>
        );
    };
};


export default ServerOverview;