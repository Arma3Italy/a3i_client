import React from 'react';
import './Navbar.scss';

const Navbar = () => (
  <div className="Navbar">
    <h2 id="logo"><a href="#arma3italy">A3I</a></h2>
    <ul id="links">
        <li><a href="#Home">Home</a></li>
        <li><a href="#Discord">Discord</a></li>
        <li><a href="#Steam">Steam</a></li>
    </ul>

    <a id="login" href="#login">Login</a>
  </div>
);

export default Navbar;