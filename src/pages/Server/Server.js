import React from 'react';
import './Server.scss';
import Navbar from './../../components/Navbar/Navbar.js';
import Table from './../../components/Table/Table.js';

const Servers = () => (
  <div className="Servers">
    <Navbar />
    <h2>Server List</h2>
    <Table header={["Rank", "Name", "Players", "Modalità", "Entra"]} body={[
      {id: 1, rank:5, name:"appesolife", players:82, modalita:"RPG", join:"xxxxx"},
      {id: 2, rank:2, name:"universallife", players:18, modalita:"RPG", join:"xxxxx"},
      {id: 3, rank:4, name:"putinlife", players:122, modalita:"RPG", join:"xxxxx"},
      {id: 4, rank:1, name:"lesslife", players:5, modalita:"RPG", join:"xxxxx"},
      {id: 5, rank:4, name:"octa mrp", players:9, modalita:"CTF", join:"xxxxx"},
      {id: 6, rank:6, name:"maldenlife nuova chiusura", players:22, modalita:"RPG", join:"xxxxx"},
      {id: 7, rank:3, name:"tumplife", players:14, modalita:"RPG", join:"xxxxx"},
    ]} />
  </div>
);

export default Servers;