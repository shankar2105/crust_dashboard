import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App.js'
import store from './redux';

render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>), 
    document.getElementById('app'));
