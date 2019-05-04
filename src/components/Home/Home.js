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
          <a className="btn btn-dark btn-box round" href="#1"><FontAwesomeIcon icon="discord" /> Discord</a>
          <a className="btn btn-dark btn-box round" href="#2"><FontAwesomeIcon icon="server" /> Servers</a>
          <a className="btn btn-dark btn-box round" href="#3"><FontAwesomeIcon icon="steam" /> Workshop</a>
          <a className="btn btn-dark btn-box round" href="#4"><FontAwesomeIcon icon="user" /> Login</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
