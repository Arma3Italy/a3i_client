import React, { Component } from 'react';

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
                            <li className="nav-item"> <a className="nav-link"  rel="noopener noreferrer" href="/home">Home</a> </li>
                            <li className="nav-item"> <a className="nav-link"  rel="noopener noreferrer" href="https://steamcommunity.com/groups/A3ITA" target="_blank">Steam Group</a> </li>
                            <li className="nav-item"> <a className="nav-link"  rel="noopener noreferrer" href="https://discord.gg/R4d5HBB" target="_blank">Discord</a> </li>
                            <li className="nav-item"> <a className="nav-link"  rel="noopener noreferrer" href="/serverlist">Server List</a> </li>
                            <li className="nav-item"> <a className="nav-link"  rel="noopener noreferrer" href="/infistarbans">InfiSTAR Bans</a> </li>
                            <li className="nav-item"> <a className="nav-link"  rel="noopener noreferrer" href="/login">LOGIN</a> </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
};

export default Header;