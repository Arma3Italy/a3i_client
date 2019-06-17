import React from 'react';
import './User.scss';
import Navbar from '../../components/Navbar/Navbar.js';
import Usercard from '../../components/Usercard/Usercard.js';


const User = () => (
  <div className="User">
    <div className="User-hover"></div>
    <Navbar />
    <div className="User-content">
      <Usercard user={{ id: '76561198141770676', url: "https://steamcommunity.com/id/yolozen/", name: "yolozen", avatar: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/07/07449cfad239b6086174c9015f7cdc5627f6d4b1_full.jpg", armaHours: 2352}} />
    </div>
  </div>
);

export default User;