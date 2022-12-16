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
    token: null,
    token_type: null,
    token_valid: false,
    validation:{
        data_error: false,
        error: false,
        help_text:""
    }
};

/** Auth reducer definition */
const reducer = (state=initialState, action) => {
    // Duplicate the state to change the Pointer
    const newState = {...state};
    // Check and select correct action
    switch ( action.type ) {

        case actionTypes.LOGIN:
            newState.token = action.token;
            newState.token_type = action.token_type;
            newState.token_valid = true;
            newState.validation = {error: false, data_error: false, help_text:""}
            break
        case actionTypes.INVALID_ENTRY:
            newState.validation = {error: true, data_error: true, help_text:"Invalid Username or Password."}
            break
        case actionTypes.INVALID_CONNECTION:
            newState.validation = {error: true, data_error: false, help_text:"Unable to connect to Server"}
            break
        case actionTypes.CLEAR_INVALID:
            newState.validation = {error: false, data_error: false, help_text:""}
            break
        case actionTypes.LOGOUT:
            newState.token = null;
            newState.token_type = null;
            newState.token_valid = false;
            newState.validation = {error: false, data_error: false, help_text:""}
            break
        case actionTypes.VALIDATE:
            newState.token_valid = true;
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;