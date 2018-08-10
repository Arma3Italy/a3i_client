import React from 'react';
import ReactDOM from 'react-dom';
import ServerListPage from './pages/serverlist/ServerListPage';
import ServerOverview from './pages/server/ServerOverview';
import Profile from './pages/profile/Profile';
import EditServer from './pages/server/EditServer';
import HomePage from './pages/home/HomePage';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';


ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/serverlist" component={ServerListPage} />
            <Route exact path="/server/:id" component={ServerOverview} />
            <Route exact path="/edit/server" component={EditServer} />
            <Route exact path="/profile" component={Profile} />
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);
