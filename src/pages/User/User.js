import React from 'react';
import './User.scss';
import Navbar from '../../components/Navbar/Navbar.js';
import Usercard from '../../components/Usercard/Usercard.js';
import Labels from '../../components/Labels/Labels.js';
import Btn from '../../components/Btn/Btn.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class User extends React.Component {

  constructor({ match }) {
    super();

    this.state = {
      sid: match.params.id,
      user: {}
    }
    
  }

  componentDidMount() {
    fetch(`http://localhost:8801/user/${this.state.sid}`)
        .then(data => data.json())
        .then(user => {
          console.log(user)
          this.setState({ user:{
            id: user.user.steamid, 
            url: user.user.url, 
            name: user.user.name, 
            avatar: user.user.avatar, 
            armaHours: 3522,
          }})
        })
        .catch(() => { console.log('ERROR') });
  };


  render() {
    const serversowned = [
      {id: 2, rank:2, name:<a href="#server2-link">universallife</a>, players:18, modalita:"RPG", join:<a href="#server2" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
      {id: 3, rank:4, name:<a href="#server3-link">putinlife</a>, players:122, modalita:"RPG", join:<a href="#server3" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
      {id: 6, rank:6, name:<a href="#server6-link">maldenlife nuova chiusura</a>, players:22, modalita:"RPG", join:<a href="#server6" ><FontAwesomeIcon size="lg" icon={['fas', 'sign-in-alt']} /></a>},
    ];
  
    const user = this.state.user;

    console.log(user)
  
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
  }
};
export default User;