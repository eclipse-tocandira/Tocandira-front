/** This module contains the initial 
 * declarations for building the whole
 * application.
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
// Local Imports
import AppRoutes from './AppRoutes';
import * as globalActions from './store/global/actions'
import readConfig from './store/readConfg';
import store from './store/store';
import './index.css'

// #######################################

// XXX: This code enforce the read of a configuration JSON file 
//      before rendering anything. This is needed to get those 
//      configurations after the application was built! The ENV
//      variables like `process.env.MY_VAR` are only parsed during
//      build process.
//      But it does sounds like a BAD idea.
readConfig().then(conf=> {
    
    // Store the configs in reducer
    store.dispatch(globalActions.setConfig(conf));

    // Render the Application
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <BrowserRouter basename={conf.root}>
                    <AppRoutes />
                </BrowserRouter>
            </Provider>
        </React.StrictMode>
    );
});

