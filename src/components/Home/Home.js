import React from 'react';
import './Home.scss';


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
          <a className="btn btn-dark btn-box round" href="#1">Discord</a>
          <a className="btn btn-dark btn-box round" href="#2">Servers</a>
          <a className="btn btn-dark btn-box round" href="#3">Workshop</a>
          <a className="btn btn-dark btn-box round" href="#4">Login</a>
        </div>
      </div>
    </div>
  );
}

export default Home;
