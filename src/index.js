import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import HomePage from './components/Home/Home';
import ServersPage from './components/Servers/Servers';

library.add(fas, fab)

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/servers" component={ServersPage} />
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);

// serviceWorker.register();