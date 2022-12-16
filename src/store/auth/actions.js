/** This module contains the implementation
 * of the actions accepted by auth redux
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import qs from 'qs';
import {AxiosError} from 'axios';
// Local Imports
import * as actionTypes from './actionTypes';

// #######################################

/** Redux action to login the user */
const saveLogin=(token,type) => ({type:actionTypes.LOGIN, token:token, token_type:type});

/** The request done prior to `saveLogin` function */
export const login=(api_instance,logindata) => (dispatch) => {
    api_instance.post('/login',qs.stringify(logindata),
        {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then( (res) => dispatch(saveLogin(res.data.access_token, res.data.token_type)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(invalidConnection());
            }else{
                dispatch(invalidEntry());
            }
        }
    )
};

/** Redux action to set an error of invalid entries */
export const invalidEntry=() => ({type:actionTypes.INVALID_ENTRY});

/** Redux action to mark the login request as invalid */
export const invalidConnection=() => ({type:actionTypes.INVALID_CONNECTION});

/** Redux action to clear the invalid status */
export const clearInvalid=() => ({type:actionTypes.CLEAR_INVALID});

/** Redux action to logout the user */
export const logout=() => ({type:actionTypes.LOGOUT});

/** Redux action to save the validation result */
const saveValidCheck=() => ({type:actionTypes.VALIDATE});

/** Redux action to validate the current token */
export const validate=(api_instance) => (dispatch) => {
    api_instance.get('/validate')
    .then( (res) => dispatch(saveValidCheck()) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(invalidConnection());
            }else{
                dispatch(logout());
            }
        }
    )
};