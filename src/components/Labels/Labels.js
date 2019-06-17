import React from 'react';
import './Labels.scss';

const Labels = (props) => {

  const server = props.server;

  return (<div className="Labels">
    <h2>{server.name}</h2>
    <hr/>
    <div className="info">
      <span><b>Players:</b> {server.players}/100</span>
      <span><b>Modalità:</b> {server.modalita}</span>
      <span>{server.join}</span>
    </div>
  </div>);
};

export default Labels;