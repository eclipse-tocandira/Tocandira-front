/** This module contains the implementation
 * of the actions accepted by auth redux
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import qs from 'qs';
// Local Imports
import * as actionTypes from './actionTypes';

// #######################################

/** Redux action to login the user */
const saveLogin=(token,type) => ({type:actionTypes.LOGIN, token:token, token_type:type});

/** The request done prior to `saveLogin` function */
export const login=(api_instance,logindata) => (dispatch) => {
    api_instance.post('/login',qs.stringify(logindata),
        {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then(
        (res) => dispatch(saveLogin(res.data.access_token, res.data.token_type))
    )
    .catch(
        (req) => dispatch(invalid())
    )
};

/** Redux action to mark the login request as invalid */
export const invalid=() => ({type:actionTypes.INVALID});

/** Redux action to logout the user */
export const logout=() => ({type:actionTypes.LOGOUT});

/** Redux action to validate the token in memmory */
export const validate=() => ({type:actionTypes.VALIDATE});
