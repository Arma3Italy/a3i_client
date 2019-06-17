import React from 'react';
import './User.scss';
import Navbar from '../../components/Navbar/Navbar.js';
import Usercard from '../../components/Usercard/Usercard.js';


const User = () => (
  <div className="User">
    <div className="User-hover"></div>
    <Navbar />
    <div className="User-content">
      <Usercard />
    </div>
  </div>
);

export default User;