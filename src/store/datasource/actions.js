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
import * as datapointActions from '../datapoint/actions'

// #######################################

/** Redux action to */
const saveData=(dslist) => ({type:actionTypes.GET_DSDATA, dslist:dslist});

/** The request done prior to `saveParams` function */
export const getData=(api_instance) => (dispatch) => {
    api_instance.get('/datasources')
    .then( (res) => dispatch(saveData(res.data)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }else{
                // dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};

const saveProtocols=(protocols) => ({type:actionTypes.GET_AVAIL_PROTOCOLS, protocols:protocols});

/** The request done prior to `saveProtocols` function */
export const getAvailProtocols=(api_instance) => (dispatch) => {
    api_instance.get('/protocol_defaults')
    .then( (res) => {
        dispatch(saveProtocols(res.data))
        dispatch(getDefaults(api_instance,res.data.menuItems))
        dispatch(datapointActions.getDefaults(api_instance,res.data.menuItems))
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

const saveProtocolDefault=(defaults,protocol) => ({type:actionTypes.GET_DS_DEFAULTS, protocol:protocol, defaults:defaults})

/** The request done prior to `saveProtocols` function */
export const getDefaults=(api_instance, prot_list) => (dispatch) => {
    prot_list.forEach(element => {
        api_instance.get('/datasource_defaults/'+element)
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

/** */
export const pushData=(api_instance, ds_info) => (dispatch) => {

    // Add dummy parameters not mapped on interface
    ds_info['timeout'] = 5000;
    ds_info['cycletime'] = 5000;
    
    api_instance.post('/datasource', ds_info)
    .then( (res) => {
        dispatch(getData(api_instance));
        dispatch(emitAlert('DataSource "'+res.data.name+'" created!','success'));
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
export const putData=(api_instance, ds_info) => (dispatch) => {

    // Add dummy parameters not mapped on interface
    ds_info['timeout'] = 5000;
    ds_info['cycletime'] = 5000;
    
    api_instance.put('/datasource', ds_info)
    .then( (res) => {
        dispatch(getData(api_instance));
        dispatch(emitAlert('DataSource "'+res.data.name+'" updated!','success'));
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
