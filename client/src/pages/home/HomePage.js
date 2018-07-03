import React, { Component } from 'react';
import './home.css';

class HomePage extends Component {

    render() {
        return (
            <div className="HomePage">
                <div className="Cover">
                    <div id="imgCover"></div>
                    <div className="blackCover"></div>
                </div>

                <div className="A3I_container">
                    <div className="text-center justify-content-center">
                        <img className="A3I_logoTitle" src="img/logo_arma3italy.png" alt="Arma3Italy" />
                        <p className="A3I_sh">Arma 3 Italy è una community aperta creata appositamente con lo scopo di riunire tutti i giocatori Italiani che vogliono incontrare nuove persone e divertirsi.</p>
                        <p className="A3I_sh">Il gruppo è libero e non obbliga i suoi partecipanti ad indossare tag in gioco oppure a cambiare il nome in alcun modo, inoltre non c'è limite di età!</p>
                        <p className="A3I_sh">Nel nostro gruppo potrai trovare staffer pronti a chiarire i vostri dubbi, ed a cui interessa creare un ambiente socievole per i giocatori!</p>
                        <div className="A3I_sh"><br/> <hr/></div>
                        <a rel="noopener noreferrer" href="https://steamcommunity.com/groups/A3ITA" target="_blank" className="A3I_iconLink"><i className="fab fa-steam"></i> <span>Steam Group</span></a>
                        <a rel="noopener noreferrer" href="https://discord.gg/R4d5HBB" target="_blank" className="A3I_iconLink"><i className="fab fa-discord"></i> <span>Discord</span></a>
                        <a rel="noopener noreferrer" href="/serverlist" className="A3I_iconLink"><i className="fas fa-server"></i> <span>Server List</span></a>
                        <a rel="noopener noreferrer" href="/infistarbans" className="A3I_iconLink"><i className="fas fa-user-secret"></i> <span>Infistar Bans</span></a>
                        <a rel="noopener noreferrer" href="/login" className="A3I_iconLink"><i className="fas fa-user-circle"></i> <span>Login</span></a>
                    </div>
                </div>

                <footer>by <a rel="noopener noreferrer" href="https://steamcommunity.com/id/xedom/" target="_blank">XEDOM</a></footer>
                <script src="js/BGCover.js"></script>
                <script src="js/home.js"></script>
            </div>
        );
    };
};

export default HomePage;