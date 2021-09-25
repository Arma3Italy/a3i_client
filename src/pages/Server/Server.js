import React from 'react';
import './Server.scss';
import Navbar from './../../components/Navbar/Navbar.js';
import Table from './../../components/Table/Table.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Servers = () => {
  
  const serverlist = [
    {id: 1, rank:5, name:<a href="#server1-link">appesolife</a>, players:82, modalita:"RPG", join:<a href="#server1-join" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    {id: 2, rank:2, name:<a href="#server2-link">universallife</a>, players:18, modalita:"RPG", join:<a href="#server2-join" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    {id: 3, rank:4, name:<a href="#server3-link">putinlife</a>, players:122, modalita:"RPG", join:<a href="#server3-join" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    {id: 4, rank:1, name:<a href="#server4-link">lesslife</a>, players:5, modalita:"RPG", join:<a href="#server4-join" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    {id: 5, rank:4, name:<a href="#server5-link">octa mrp</a>, players:9, modalita:"CTF", join:<a href="#server5-join" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    {id: 6, rank:6, name:<a href="#server6-link">maldenlife nuova chiusura</a>, players:22, modalita:"RPG", join:<a href="#server6-join" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    {id: 7, rank:3, name:<a href="#server7-link">tumplife</a>, players:14, modalita:"RPG", join:<a href="#server7-join" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
  ];

  return (<div className="Servers">
    <div className="Servers-hover"></div>
    <Navbar />
    <div className="Servers-content">
      <h2 className="title">Server List</h2>
      <Table header={["Rank", "Name", "Players", "Modalità", "Entra"]} body={serverlist} />
    </div>
  </div>)
};

export default Servers;