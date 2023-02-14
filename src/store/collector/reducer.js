/** This module contains the auth
 * reducer build and configuration
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Local Imports
import * as actionTypes from './actionTypes'

// #######################################

/** Initial state of the auth redux */
const initialState = {
    ip:'127.0.0.1',
    port:4800,
    interval:12,
    validation:{
        error:false,
        help_text:""
    }
};

/** Auth reducer definition */
const reducer = (state=initialState, action) => {
    // Duplicate the state to change the Pointer
    const newState = {...state};
    // Check and select correct action
    switch ( action.type ) {
        case actionTypes.SET_PARAMS:
            newState.ip = action.ip;
            newState.port = action.port;
            newState.interval = action.interval;
            newState.validation = {error: false, data_error: false, help_text:""}
            break
        case actionTypes.CLEAR_INVALID:
            newState.validation = {error: false, help_text:""}
            break
        case actionTypes.INVALID_CONNECTION:
            newState.validation = {error: true, help_text:"Unable to connect to Server"}
            break
        case actionTypes.INVALID_ENTRY:
            newState.validation = {error: true, help_text:action.msg}
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;