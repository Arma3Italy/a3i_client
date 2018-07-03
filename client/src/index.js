import React from 'react';
import ReactDOM from 'react-dom';
import ServerListPage from './pages/serverlist/ServerListPage';
import HomePage from './pages/home/HomePage';
import { BrowserRouter, Route } from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/serverlist" component={ServerListPage} />
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);
