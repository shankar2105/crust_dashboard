import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App.js'
import store from './redux';
import './less/main.less'

render((
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App}/>
        </BrowserRouter>
    </Provider>),
    document.getElementById('app'));
