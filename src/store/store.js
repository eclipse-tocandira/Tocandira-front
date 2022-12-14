/** This module contains...
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

// #######################################

// Join all Reducers
const rootReducer = combineReducers({
    global: globalReducer,
    auth: authReducer,
    // api: apiReducer
});

// Configure the Redux Storage
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store