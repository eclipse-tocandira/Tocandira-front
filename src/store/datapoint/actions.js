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

/** Redux action to write the list of data points obtained back-end
* in the dp_content variable
* @param `dplist`: List of data points fetched from the backend
* @returns `actionTypes.GET_DPDATA`: action that saves list of backend
* data points in dp_content variable */
const saveData=(dplist) => ({type:actionTypes.GET_DPDATA, dplist:dplist});

/** Redux action to update dp_verify variable with pending data point
* name and address values
* @returns `actionTypes.UPDATE_DPDATA_PENDING`: Update the dp_verify variable with
values of names and addresses of dependent data points */
export const updateDataPending=() => ({type:actionTypes.UPDATE_DPDATA_PENDING});

/** Redux action to update dp_verify status and response values
* @param `dplist`: List with status, message and response values
* @param `dpname`: Name Data Point present in dp_verify that will have its values updated
* @returns `actionTypes.VERIFY_DPDATA_PENDING`: Returns a dp_verify variable with updated 
* status and response values */
const saveDataVerify=(dplist, dpname) => ({type:actionTypes.VERIFY_DPDATA_PENDING, dplist:dplist, dpname:dpname});

/** The request done prior to `saveData` function
* Request to the backend to get the list of data points
* @param `api_instance`: Value containing the authentication for the backend */
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

/** The request done prior to `saveDataVerify` function
* Request to the backend to check the validity of a data point
* @param `api_instance`: Value containing the authentication for the backend
* @param `dpname`: Name of the Data Point that will be checked */
export const postDataVerify=(api_instance, dpname) => (dispatch) => {
    api_instance.post('/test/' + dpname)
    .then( (res) => dispatch(saveDataVerify(res.data, dpname)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                dispatch(emitNetworkErrorAlert());
            }else{
                // dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};

/** Redux action fills the dp_defaults variable with the default 
* values of a protocol's variables
* @param `defaults`: Valores padrão das variaveis de um protocolo
* @param `protocolo`: Nome do protocolo
* @returns `actionTypes.GET_DP_DEFAULTS`: Returns a dp_defaults 
* variable with the updated protocol default values */
const saveProtocolDefault=(defaults,protocol) => ({type:actionTypes.GET_DP_DEFAULTS, protocol:protocol, defaults:defaults})

/** The request done prior to `saveProtocolDefault` function
* Request to the backend to check the validity of a data point
* @param `api_instance`: Value containing the authentication for the backend
* @param `prot_list`: Name of the Data Point that will be checked */
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

/** Request to the backend, where the value of the pending attribute of 
* a list of data points is validated
* @param `api_instance`: Value containing the authentication for the backend
* @param `dplist`: list of data points */
export const putDataPointConfirm=(api_instance, dplist) => (dispatch) => {
    dplist.forEach((row) => {
        api_instance.put('/datapoint/' + row.name + '/confirm')
        .then( (res) => {
            dispatch(getData(api_instance))
        })
        .catch( (req) => {
                if(req.code===AxiosError.ERR_NETWORK){
                    dispatch(emitNetworkErrorAlert());
                }else{
                    // dispatch(invalidEntry(req.response.data.detail));
                }
            }
        )
    })
};

/** Request to the backend, where a new data point will be created
* @param `api_instance`: Value containing the authentication for the backend
* @param `dp_info`: Attributes of the new data point */
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

/** Request to the backend, where a data point will have its values updated
* @param `api_instance`: Value containing the authentication for the backend
* @param `dp_info`: Updated data point attributes */
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

/** Request to the backend, where a data point will be deleted
* @param `api_instance`: Value containing the authentication for the backend
* @param `dp_name`: Name of the data point to be deleted */
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

/** Request to the backend, which sets the value of the active attribute of a data point
* @param `api_instance`: Value containing the authentication for the backend
* @param `dp_name`: Data point name that will have its active attribute changed
* @param `status`: New active attribute value (must be boolean) */
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

/** Request to the backend */
export const exportData=(api_instance) => (dispatch) => {
    api_instance.post('/export')
    .then( (res) => {
        dispatch(emitAlert('DataPoints Uploaded!','success'));
    } )
    .catch( (req) => {
        if(req.code===AxiosError.ERR_NETWORK){
            dispatch(emitNetworkErrorAlert());
        }else{
            dispatch(emitAlert(req.response.data.detail,'error'));
        }
        }
    )    
};