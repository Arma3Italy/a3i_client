import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.scss';
import reportWebVitals from './reportWebVitals';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import HomePage from './pages/Home/Home';
import ServerPage from './pages/Server/Server';
import UserPage from './pages/User/User';

library.add(fas, fab)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/server" component={ServerPage} />
            <Route exact path="/user/:id" component={UserPage} />
        </React.Fragment>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
