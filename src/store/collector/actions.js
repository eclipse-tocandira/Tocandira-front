/** This module contains the implementation
 * of the actions accepted by auth redux
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import {AxiosError} from 'axios';
// Local Imports
import * as actionTypes from './actionTypes';
import { emitNetworkErrorAlert } from '../popups/actions';

// #######################################


/** Redux action to */
export const setParams=(ip,port,interval) => ({type:actionTypes.SET_PARAMS, ip:ip, port:port, interval:interval});

/** Redux action to */
export const clearInvalid=() => ({type:actionTypes.CLEAR_INVALID});

/** The request done prior to `saveParams` function */
export const getParams=(api_instance) => (dispatch) => {
    api_instance.get('/collector')
    .then( (res) => dispatch(setParams(res.data.ip, res.data.port, res.data.update_period)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }else{
                dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};

/** Redux action to set an error of invalid entries */
export const invalidEntry=(msg) => ({type:actionTypes.INVALID_ENTRY, msg:msg});
