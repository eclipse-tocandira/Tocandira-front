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
    name: null,
    is_admin: false,
    change_password: null,
    validation:{
        data_error: false,
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
            newState.token = action.usr.access_token;
            newState.token_type = action.usr.token_type;
            newState.name= action.usr.name;
            newState.is_admin= action.usr.is_admin;
            newState.change_password= action.usr.change_password;
            newState.token_valid = true;
            newState.validation = {data_error: false, help_text:""}
            break
        case actionTypes.INVALID_ENTRY:
            newState.validation = {data_error: true, help_text:"Invalid Username or Password."}
            break
        case actionTypes.CLEAR_INVALID:
            newState.validation = {data_error: false, help_text:""}
            break
        case actionTypes.LOGOUT:
            newState.token = null;
            newState.token_type = null;
            newState.token_valid = false;
            newState.name = null;
            newState.is_admin = false;
            newState.change_password = false;
            newState.validation = {data_error: false, help_text:""}
            break
        case actionTypes.BYPASS_PASS_CHANGE:
            newState.change_password = false;
            break
        case actionTypes.VALIDATE:
            newState.token_valid = true;
            break
        default:
            break
    }
    return(newState);
};

export default reducer;