/** This module contains the implementation
 * of the actions accepted by auth redux
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import {AxiosError} from 'axios';
// Local Imports
import * as actionTypes from './actionTypes';
import { emitNetworkErrorAlert, emitAlert} from '../popups/actions';

// #######################################

/** Redux action to */
/** Description.
* @param ``: 
* @returns */
const saveData=(dplist) => ({type:actionTypes.GET_DPDATA, dplist:dplist});

// /** Redux action to */
const saveDataVerify=(dplist, dpname) => ({type:actionTypes.VERIFY_DPDATA_PENDING, dplist:dplist, dpname:dpname});

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
export const postDataVerify=(api_instance, dpname) => (dispatch) => {
    api_instance.post('/test/' + dpname)
    .then( (res) => dispatch(saveDataVerify(res.data, dpname)) )
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

/** The request done prior to `saveParams` function */
export const putDataComfirm=(api_instance, dplist) => (dispatch) => {
    dplist.forEach((row) => {
        api_instance.put('/datapoint/' + row.name + '/confirm')
        .then( (res) => {
            dispatch(getData(api_instance))
        })
        .catch( (req) => {
                if(req.code===AxiosError.ERR_NETWORK){
                    // dispatch(invalidConnection());
                }else{
                    // dispatch(invalidEntry(req.response.data.detail));
                }
            }
        )
    })
};

/** */
export const pushData=(api_instance, dp_info) => (dispatch) => {
    api_instance.post('/datapoint', dp_info)
    .then( (res) => {
        dispatch(getData(api_instance));
        dispatch(emitAlert('DataPoint "'+res.data.name+'" created!','success'));
    } )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }else{
            // dispatch(invalidEntry(req.response.data.detail));
        }
        }
    )    
};

/** */
export const putData=(api_instance, dp_info) => (dispatch) => {
    api_instance.put('/datapoint', dp_info)
    .then( (res) => {
        dispatch(getData(api_instance));
        dispatch(emitAlert('DataPoint "'+res.data.name+'" updated!','success'));
    } )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }else{
            // dispatch(invalidEntry(req.response.data.detail));
        }
        }
    )    
};

/** */
export const deleteData=(api_instance, dp_name) => (dispatch) => {
    api_instance.delete('/datapoint/'+dp_name)
    .then( (res) => {
        if(res.data[dp_name]){
            dispatch(emitAlert('DataPoint "'+dp_name+'" deleted!','success'));
            dispatch(getData(api_instance))
        } else {
            dispatch(emitAlert('Unable to delete DataPoint "'+dp_name+'"','error'))
        }
    } )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }else{
            // dispatch(invalidEntry(req.response.data.detail));
        }
        }
    )    
};

/** */
export const manageActiveData=(api_instance, dp_name, status) => (dispatch) => {
    api_instance.put('/datapoint/'+dp_name+'='+status)
    .then( (res) => {
        if (status){
            if(!res.data[dp_name]){
                dispatch(emitAlert('Unable to undo delete of DataPoint "'+dp_name+'"','error'))
            }
        } else {
            if(res.data[dp_name]){
                dispatch(emitAlert('DataPoint "'+dp_name+'" deleted!','success'));
                dispatch(getData(api_instance))
            } else {
                dispatch(emitAlert('Unable to delete DataPoint "'+dp_name+'"','error'))
            }
        }
    } )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }else{
            // dispatch(invalidEntry(req.response.data.detail));
        }
        }
    )    
};
