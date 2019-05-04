import React from 'react';
import './Home.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Home() {
  return (
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
          <a className="btn btn-dark btn-box round" href="#1"><FontAwesomeIcon icon={['fab', 'discord']} /> <span className="none">Discord</span></a>
          <a className="btn btn-dark btn-box round" href="#2"><FontAwesomeIcon icon="server" /> <span className="none">Servers</span></a>
          <a className="btn btn-dark btn-box round" href="#3"><FontAwesomeIcon icon={['fab', 'steam']} /> <span className="none">Workshop</span></a>
          <a className="btn btn-dark btn-box round" href="#4"><FontAwesomeIcon icon="user" /> <span className="none">Login</span></a>
        </div>
      </div>
    </div>
  );
}

export default Home;
