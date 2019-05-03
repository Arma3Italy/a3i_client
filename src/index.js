import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
// import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './components/Home/Home';

ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
        </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
);

// serviceWorker.register();
