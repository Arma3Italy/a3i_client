import React from 'react';
import './Usercard.scss';

const Usercard = (props) => {
  const user = props.user;

  return (<div className="Usercard">
    <img src={user.avatar} alt="user avatar"/>
    <h2><a href={user.url} target="_blank" rel="noopener noreferrer">{user.name}</a></h2>
    <p>ARMA 3: {user.armaHours} ore</p>
  </div>);
};

export default Usercard;