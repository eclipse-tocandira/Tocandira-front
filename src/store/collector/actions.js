/** This module contains the implementation
 * of the actions accepted by auth redux
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import {AxiosError} from 'axios';
// Local Imports
import * as actionTypes from './actionTypes';
import { emitNetworkErrorAlert, emitAlert } from '../popups/actions';

// #######################################

/** Redux action to */
export const selectCollector=(id) => ({type:actionTypes.SELECT_ID, id:id});

/** Redux action to */
export const clearInvalid=() => ({type:actionTypes.CLEAR_INVALID});

/** The request done prior to `saveParams` function */
export const getParams=(id,api_instance) => (dispatch) => {
    api_instance.get('/collector/'+id)
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

/** The request done prior to `saveParams` function */
export const putParams=(api_instance,info) => (dispatch) => {
    api_instance.put('/collector',info)
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }else{
                dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};

export const saveList=(col_list) => ({type:actionTypes.SAVE_LIST, col_list:col_list});

/** The request done prior to `` function */
export const getAvailStatus=(api_instance) => (dispatch) => {
    api_instance.get('/collectors/status')
    .then( (res) => dispatch(saveList(res.data)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }
        }
    )
};

/** The request done prior to `` function */
export const getAvail=(api_instance) => (dispatch) => {
    api_instance.get('/collectors')
    .then( (res) => {
        dispatch(saveList(res.data));
        dispatch(getAvailStatus(api_instance));
    } )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }
        }
    )
};

/** The request done prior to `` function */
export const remove=(api_instance,id) => (dispatch) => {
    api_instance.delete('/collector/'+id)
    .then( (res) => {
        if (res.data[id]){
            dispatch(emitAlert('Collector removed!','success'));
        } else {
            dispatch(emitAlert('Failed to remove Collector!','error'));
        }
        dispatch(getAvail(api_instance));
    } )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }
        }
    )
};

const saveDefaultCollector=(defcol) => ({type:actionTypes.SAVE_DEFAULT_COLLECTOR, defcol:defcol});

/** The request done prior to `` function */
export const getDefault=(api_instance) => (dispatch) => {
    api_instance.get('/collector_defaults')
    .then( (res) => dispatch(saveDefaultCollector(res.data)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }
        }
    )
};

/** The request done prior to `` function */
export const newCollector=(api_instance,data) => (dispatch) => {
    api_instance.post('/collector',data)
    .then( (res) => {
        dispatch(emitAlert('New collector created!','success'));
        dispatch(getAvail(api_instance));
    } )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            } else {
                dispatch(emitAlert('Error creating collector.','error'));
            }
        }
    )
};

/** The request done prior to `` function */
export const updateCollector=(api_instance,data) => (dispatch) => {
    api_instance.put('/collector/'+data.id,data)
    .then( (res) => {
        dispatch(emitAlert('Collector updated!','success'));
        dispatch(getAvail(api_instance));
    } )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            } else {
                dispatch(emitAlert('Error updating collector.','error'));
            }
        }
    )
};
