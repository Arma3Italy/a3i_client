import React from 'react';
import './Server.scss';
import Navbar from './../../components/Navbar/Navbar.js';
import Table from './../../components/Table/Table.js';

const Servers = () => (
  <div className="Servers">
    <div className="Servers-hover"></div>
    <Navbar />
    <div className="Servers-content">
      <h2 className="title">Server List</h2>
      <Table header={["Rank", "Name", "Players", "Modalità", "Entra"]} body={[
        {id: 1, rank:5, name:"appesolife", players:82, modalita:"RPG", join:"->"},
        {id: 2, rank:2, name:"universallife", players:18, modalita:"RPG", join:"->"},
        {id: 3, rank:4, name:"putinlife", players:122, modalita:"RPG", join:"->"},
        {id: 4, rank:1, name:"lesslife", players:5, modalita:"RPG", join:"->"},
        {id: 5, rank:4, name:"octa mrp", players:9, modalita:"CTF", join:"->"},
        {id: 6, rank:6, name:"maldenlife nuova chiusura", players:22, modalita:"RPG", join:"->"},
        {id: 7, rank:3, name:"tumplife", players:14, modalita:"RPG", join:"->"},
      ]} />
    </div>
  </div>
);

export default Servers;