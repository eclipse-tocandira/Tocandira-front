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
    validation:{
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
            newState.validation = {error: false, help_text:""}
            break
        case actionTypes.INVALID:
            newState.token = null;
            newState.token_type = null;
            newState.validation = {error: true, help_text:"Invalid Username or Password."}
            break
        case actionTypes.LOGOUT:
            newState.token = null;
            newState.token_type = null;
            newState.validation = {error: false, help_text:""}
            break
        case actionTypes.VALIDATE:
            console.warn('[reducers/auth] "',action.type,'" Not implemented')
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;