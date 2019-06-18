import React from 'react';
import './User.scss';
import Navbar from '../../components/Navbar/Navbar.js';
import Usercard from '../../components/Usercard/Usercard.js';
import Labels from '../../components/Labels/Labels.js';
import Btn from '../../components/Btn/Btn.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const User = () => {

  const serversowned = [
    {id: 2, rank:2, name:<a href="#server2-link">universallife</a>, players:18, modalita:"RPG", join:<a href="#server2" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    {id: 3, rank:4, name:<a href="#server3-link">putinlife</a>, players:122, modalita:"RPG", join:<a href="#server3" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    {id: 6, rank:6, name:<a href="#server6-link">maldenlife nuova chiusura</a>, players:22, modalita:"RPG", join:<a href="#server6" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
  ];

  const user = { id: '76561198141770676', url: "https://steamcommunity.com/id/yolozen/", name: "yolozen", avatar: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/07/07449cfad239b6086174c9015f7cdc5627f6d4b1_full.jpg", armaHours: 2352};

  return (<div className="User">
    <div className="User-hover"></div>
    <Navbar />
    <div className="User-content">
      <Usercard user={user} />
      <div className="serversOwned">
        <div className="title">
          <h2>Owned servers</h2>
          <div className="btns">
            <Btn name="Aggiungi" url="#aggiugi" />
          </div>
        </div>
        {serversowned.map(server => <Labels server={server} />)}
      </div>
    </div>
  </div>);
};
export default User;