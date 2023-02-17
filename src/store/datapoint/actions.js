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
const saveData=(dplist) => ({type:actionTypes.GET_DPDATA, dplist:dplist});

// /** Redux action to */
const saveDataConfirm=(dplist, dpname) => ({type:actionTypes.CONFIRM_DPDATA_PENDING, dplist:dplist, dpname:dpname});

/** Redux action to */
export const updateDataPending=() => ({type:actionTypes.UPDATE_DPDATA_PENDING});

/** The request done prior to `saveParams` function */
export const getData=(api_instance) => (dispatch) => {
    api_instance.get('/datapoints')
    .then( (res) => dispatch(saveData(res.data)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert())
            }else{
                // dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};

/** The request done prior to `saveParams` function */
export const postDataConfirm=(api_instance, dpname) => (dispatch) => {
    api_instance.post('/test/' + dpname)
    .then( (res) => dispatch(saveDataConfirm(res.data, dpname)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                // dispatch(invalidConnection());
            }else{
                // dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};

const saveProtocolDefault=(defaults,protocol) => ({type:actionTypes.GET_DP_DEFAULTS, protocol:protocol, defaults:defaults})

/** The request done prior to `saveProtocols` function */
export const getDefaults=(api_instance, prot_list) => (dispatch) => {
    prot_list.forEach(element => {
        api_instance.get('/datapoint_defaults/'+element)
        .then( (res) => dispatch(saveProtocolDefault(res.data,element)) )
        .catch( (req) => {
                if(req.code===AxiosError.ERR_NETWORK){
                    dispatch(emitNetworkErrorAlert());
                }else{
                // dispatch(invalidEntry(req.response.data.detail));
            }
            }
        )
    });
    
};
