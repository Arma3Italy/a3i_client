import React from 'react';
import ReactDOM from 'react-dom';
import ServerListPage from './pages/serverlist/ServerListPage';
import ServerOverview from './pages/server/ServerOverview';
import HomePage from './pages/home/HomePage';
import { BrowserRouter, Route } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/serverlist" component={ServerListPage} />
            <Route exact path="/server/:id" component={ServerOverview} />
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);
