import React, { Component } from 'react';
import './home.css';

class HomePage extends Component {

    state = {
        imgList: ['arma3jet.jpg', 'arma3kart.jpg', 'arma3mine.jpg', 'arma3tank.jpg'],
        imgSelected: 1,
        imgDaley: 6 // in seconds
    };

    componentDidMount() {
        this.imgChanger = setInterval(() => {
            this.setState({
                imgSelected: this.state.imgSelected < this.state.imgList.length-1 ? this.state.imgSelected+1 : 0
            });
        }, this.state.imgDaley*1000);
    };

    render() {
        return (
            <div className="HomePage" style={{ backgroundImage: `url('/img/bg/${this.state.imgList[this.state.imgSelected]}')` }}>
                <div className="blackHover"></div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossOrigin="anonymous" />
                
                <div className='A3I_container'>
                    <a rel="noopener noreferrer" href="/" ><img src="/img/logo_arma3italy.png" alt="Arma3Italy" /></a>

                    <p>Arma 3 Italy è una community aperta creata appositamente con lo scopo di riunire tutti i giocatori Italiani che vogliono incontrare nuove persone e divertirsi.</p>
                    <p>Il gruppo è libero e non obbliga i suoi partecipanti ad indossare tag in gioco oppure a cambiare il nome in alcun modo, inoltre non c'è limite di età!</p>
                    <p>Nel nostro gruppo potrai trovare staffer pronti a chiarire i vostri dubbi, ed a cui interessa creare un ambiente socievole per i giocatori!</p>

                    <a className="btnLinks" rel="noopener noreferrer" href="https://steamcommunity.com/groups/A3ITA" target="_blank" title="Steam Group"><i className="fab fa-steam"></i></a>
                    <a className="btnLinks" rel="noopener noreferrer" href="https://discord.gg/R4d5HBB" target="_blank" title="Discord"><i className="fab fa-discord"></i></a>
                    <a className="btnLinks" rel="noopener noreferrer" href="/serverlist" title="Server List"><i className="fas fa-server"></i></a>
                    <a className="btnLinks" rel="noopener noreferrer" href="/login" title="Login"><i className="fas fa-user-circle"></i></a>
                </div>

                <div className="footer"> By <a rel="noopener noreferrer" href="https://steamcommunity.com/id/xedom/" target="_blank" title="Contact Me">XEDOM</a> with ❤️</div>

            </div>
        );
    };
};

export default HomePage;