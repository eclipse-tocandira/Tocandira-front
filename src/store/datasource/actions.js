/** This module contains the implementation
 * of the actions accepted by auth redux
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules
import {AxiosError} from 'axios';
// Local Imports
import * as actionTypes from './actionTypes';

// #######################################

/** Redux action to */
const saveData=(dslist) => ({type:actionTypes.GET_DATA, dslist:dslist});

/** The request done prior to `saveParams` function */
export const getData=(api_instance) => (dispatch) => {
    api_instance.get('/datasources')
    .then( (res) => dispatch(saveData(res.data)) )
    .catch( (req) => {
            if(req.code===AxiosError.ERR_NETWORK){
                // dispatch(invalidConnection());
            }else{
                // dispatch(invalidEntry(req.response.data.detail));
            }
        }
    )
};
