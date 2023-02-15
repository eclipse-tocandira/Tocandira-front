/** This module contains the redux
 * store definitions
 * 
 * Copyright (c) 2017 Aimirim STI.
 * Dependencies are:
 * - redux 
 * - redux-thunk 
*/

// Imports from modules
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// Local Imports
import globalReducer from './global/reducer';
import authReducer from './auth/reducer';
import popupsReducer from './popups/reducer';
import collectorReducer from './collector/reducer';
import datasourceReducer from './datasource/reducer';
// #######################################

// Join all Reducers
const rootReducer = combineReducers({
    global: globalReducer,
    auth: authReducer,
    popups: popupsReducer,
    collector: collectorReducer,
    datasource: datasourceReducer,
});

// Configure the Redux Storage
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store