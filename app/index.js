import "babel-polyfill";
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App.js'
import store from './redux';
import { prepareLogs } from './redux/utils';
import Action from './redux/ActionType';
import './less/main.less'

import {track} from 'bizcharts';

// Disable telemetry (https://github.com/alibaba/BizCharts/issues/143)
track(false);

class Websocket {
    
    constructor(store) {
        this.isReady = false;
        this.store = store;
        this.logs = [];
        this.store.subscribe(() => this._storeListener());
    }

    _storeListener() {
        if ((this.isReady && this.store.getState().logReducer.isReady) || !this.store.getState().logReducer.isReady) {
            return;
        }
        debugger;
        if (this.logs.length === 0) {
            return;
        }
        store.dispatch({
            type: Action.NEW_LOG,
            payload: prepareLogs(this.logs).logs
        });
        this.logs = [];
        this.isReady = true;        
    }

    connect() {
        // TODO websocket impl
    }

    push(log) {
        if  (!this.isReady) {
            return logs.push(log);
        }
        store.dispatch({
            type: Action.NEW_LOG,
            payload: prepareLogs([log]).logs
        });
    }

}

render((
    <Provider store={store}>
        <BrowserRouter>
            <Route component={App}/>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root'));
