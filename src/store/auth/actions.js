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
import { emitNetworkErrorAlert, emitAlert } from '../popups/actions';

// #######################################

/** Redux action to login the user */
const saveLogin=(usr) => ({type:actionTypes.LOGIN, usr:usr});

/** The request done prior to `saveLogin` function */
export const login=(api_instance,logindata) => (dispatch) => {
    api_instance.post('/login',qs.stringify(logindata),
        {headers: { 'content-type': 'application/x-www-form-urlencoded' }})
    .then( (res) => dispatch(saveLogin(res.data)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert())
            }else{
                dispatch(invalidEntry());
            }
        }
    )
};

/** Redux action to set an error of invalid entries */
export const invalidEntry=() => ({type:actionTypes.INVALID_ENTRY});

/** Redux action to clear the invalid status */
export const clearInvalid=() => ({type:actionTypes.CLEAR_INVALID});

/** Redux action to logout the user */
export const logout=() => ({type:actionTypes.LOGOUT});

/** Redux action to set an error of invalid entries */
export const bypassPasswordChange=() => ({type:actionTypes.BYPASS_PASS_CHANGE});

/** Redux action to save the validation result */
const saveValidCheck=() => ({type:actionTypes.VALIDATE});

/** Redux action to validate the current token */
export const validate=(api_instance) => (dispatch) => {
    api_instance.get('/validate')
    .then( () => dispatch(saveValidCheck()) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert())
            }else{
                dispatch(emitAlert('User Authentication Expired','info'))
            }
            dispatch(logout());
        }
    )
};

/** Redux action to change the user's password */
export const changePassword=(api_instance,new_pass) => (dispatch) => {
    api_instance.put('/user/password',new_pass)
    .then( () => {
        dispatch(logout());
        dispatch(emitAlert('Password Changed! Please login again','info'));
    })
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert())
            }
            dispatch(logout());
        }
    )
};