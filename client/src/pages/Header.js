import React, { Component } from 'react';
import cfg from '../cfg/cfg';

class Header extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">Arma3Italy</a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="fas fa-bars px-2 py-1"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item"> <a className="nav-link" rel="noopener noreferrer" href={`/${cfg.clientApp.routes.home.url}`}>{cfg.clientApp.routes.home.name}</a> </li>
                            <li className="nav-item"> <a className="nav-link" rel="noopener noreferrer" href={`${cfg.clientApp.routes.steamgroup.url}`} target="_blank">{cfg.clientApp.routes.steamgroup.name}</a> </li>
                            <li className="nav-item"> <a className="nav-link" rel="noopener noreferrer" href={`${cfg.clientApp.routes.discord.url}`} target="_blank">{cfg.clientApp.routes.discord.name}</a> </li>
                            <li className="nav-item"> <a className="nav-link" rel="noopener noreferrer" href={`/${cfg.clientApp.routes.serverlist.url}`}>{cfg.clientApp.routes.serverlist.name}</a> </li>
                            <li className="nav-item"> <a className="nav-link" rel="noopener noreferrer" href={`${cfg.serverApp.protocol}${cfg.serverApp.host}:${cfg.serverApp.port}/api/login/${cfg.clientApp.protocol.split('://')[0]}_${cfg.clientApp.host}_${cfg.clientApp.port}_${cfg.clientApp.routes.profile.url}`}>{cfg.clientApp.routes.profile.name}</a> </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    };
};

export default Header;