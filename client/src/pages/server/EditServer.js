import React, { Component } from 'react';
import './EditServer.css';
import cfg from '../../cfg/cfg';

class EditServer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverID: props.location.search.split('?id=')[1],
            server: {},
            data: {}
        };

        this.handelChange = this.handelChange.bind(this);
        this.handelSubmit = this.handelSubmit.bind(this);
    };

    componentDidMount() {
        fetch(`${cfg.serverApp.protocol}${cfg.serverApp.host}:${cfg.serverApp.port}/api/serverlist/ip?address=${this.state.serverID.split(':')[0]}&port=${this.state.serverID.split(':')[1]}`)
            .then(data => data.json())
            .then(server => this.setState({ server }))
            .then(() => {
                const server = this.state.server;
                this.setState({
                    data: {
                        name: server.name,
                        ip: server.addr,
                        gametype: server.gametype,
                        description: server.desc
                    }
                });
            })
            .catch(() => { console.log('error fetch editServer') });
    };

    handelChange(event) {
        const inputdata = this.state.data;
        this.setState({
            data: { 
                ...inputdata,
                [event.target.name]: event.target.value
            }
        });
    };

    handelSubmit(event) {
        event.preventDefault();
        console.log(this.state.data)
    };

    render() {
        return (
            <div className="EditServer">
                <div className="xe_container">
                    <div className="">
                        <h1>Edit Server</h1>
                    </div>
                    <form onSubmit={this.handelSubmit}>
                        <div className="group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" name="name" value={this.state.data.name} onChange={this.handelChange}/>
                        </div>
                        <div className="group">
                            <label htmlFor="ip">IP</label>
                            <input type="text" value={this.state.data.ip} onChange={this.handelChange} name="ip"/>
                        </div>
                        <div className="group">
                            <label htmlFor="gamemode">Tipo</label>
                            <select name="gametype" value={this.state.data.gametype} onChange={this.handelChange}>
                                <option value="Unknown">Undefined</option>
                                <option value="DM">Deathmatch</option>
                                <option value="CTF">Capture The Flag</option>
                                <option value="Coop">Cooperative Scenario</option>
                                <option value="CTI">Capture The Island</option>
                                <option value="SC">Sector Control</option>
                                <option value="TDM">Team Deathmatch</option>
                                <option value="RPG">Role-Playing Game</option>
                                <option value="Sandbox">Sandbox</option>
                                <option value="Zeus">Zeus</option>
                                <option value="EndGame">End Game</option>
                                <option value="Support">Support</option>
                                <option value="KOTH">King Of The Hill</option>
                                <option value="LastMan">Last Man Standing</option>
                                <option value="Survive">Survival</option>
                                <option value="Patrol">Combat Patrol</option>
                            </select>
                        </div>
                        <div className="group">
                            <label>Descrizione</label>
                            <textarea name="description"  value={this.state.data.description} onChange={this.handelChange} />
                        </div>
                        <hr/>
                        <h4>Change Logs</h4>
                        <div className="group">
                            <label>Titolo</label>
                            <input type="text" name="changelogTitle"  value={this.state.data.changelogtitle} onChange={this.handelChange} />
                            <label>Descrizione</label>
                            <textarea name="changelogBody"  value={this.state.data.changelogdescription} onChange={this.handelChange} />
                        </div>
                        <button>SALVA</button>
                    </form>
                </div>
            </div>
        );
    };
};

export default EditServer;