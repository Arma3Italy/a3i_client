import React from 'react';
import './Home.scss';

function Home() {
  return (
    <div className="Home">
      <div className="cont">
        <div className="head">
          <h1>Arma 3 Italy</h1>
          <hr/>
          <p>Aiutiamoci a vicenda</p>
        </div>
        <div className="social">
          <a href="#1">Discord</a>
          <a href="#2">Servers</a>
          <a href="#3">Workshop</a>
          <a href="#4">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
