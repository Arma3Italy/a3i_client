import React from 'react';
import './Home.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = () => (
  <div className="Home">
    <div className="Home-hover">
    </div>
    <div className="Home-content">
      <div className="head">
        <h1>Arma 3 Italy</h1>
        <hr/>
        <p>Aiutiamoci a vicenda</p>
      </div>
      <div className="social">
        <a className="btn btn-dark circle round" href="https://discord.gg/R4d5HBB" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon size="lg" icon={['fab', 'discord']} /> <span className="none">Discord</span></a>
        <a className="btn btn-dark circle round" href="/server"><FontAwesomeIcon size="lg" icon="server" /> <span className="none">Servers</span></a>
        <a className="btn btn-dark circle round" href="https://steamcommunity.com/groups/A3ITA" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon size="lg" icon={['fab', 'steam']} /> <span className="none">Workshop</span></a>
        <a className="btn btn-dark circle round" href="#4"><FontAwesomeIcon size="lg" icon="user" /> <span className="none">Login</span></a>
      </div>
    </div>
    <div className="foot">
      <p>for Arma3Italy by <a href="https://github.com/xedom">XEDOM</a> with <span role="img" aria-label="heart">❤️</span></p>
    </div>
  </div>
);

export default Home;
