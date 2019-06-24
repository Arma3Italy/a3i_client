import React from 'react';
import './Navbar.scss';
import logo from '../../assets/wallpapers/logo.png';

const Navbar = () => (
  <div className="Navbar">
    <h2 id="logo"><a href="/"> <img src={logo} alt=""/> </a></h2>
    <ul id="links">
        <li><a href="/server">Servers</a></li>
        <li><a target="_black" href="https://discord.gg/R4d5HBB">Discord</a></li>
        <li><a target="_black" href="https://steamcommunity.com/groups/A3ITA">Steam</a></li>
    </ul>

    <a id="login" href="http://localhost:8801/auth">Login</a>
  </div>
);

export default Navbar;