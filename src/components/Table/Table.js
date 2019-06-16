import React from 'react';
import './Table.scss';

const Row = (props) => {
  const col = props.obj.map(title => (<div className="item">{title}</div>));
  return (<div className={props.type}>{col}</div>);
};

const Table = (props) => {

  return (<div className="Table">
    <Row key="99" type="head" obj={props.header} />
    {props.body.map(server => (<Row key={server.id} type="body" obj={[server.rank, server.name, server.players, server.modalita, server.join]} />))}
  </div>);
};

export default Table;