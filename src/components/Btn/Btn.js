import React from 'react';
import './Btn.scss';

const Btn = (props) => {
  const name = props.name;
  const url = props.url;

  return (<div className="Btn">
    <a href={url}>{name}</a>
  </div>);
};

export default Btn;