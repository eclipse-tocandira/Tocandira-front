/** This module contains the auth
 * reducer build and configuration
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Local Imports
import * as actionTypes from './actionTypes';
import { getDataPointAddress } from '../../component/Protocols/Protocols';

// #######################################

/** Initial state of the auth redux */
const initialState = {
    dp_content:[],
    dp_defaults:{},
    dp_verify:[],
};

/** Auth reducer definition */
const reducer = (state=initialState, action) => {
    // Duplicate the state to change the Pointer
    const newState = {...state};
    // Check and select correct action
    switch ( action.type ) {
        case actionTypes.GET_DPDATA:
            newState.dp_content = [...action.dplist];
            break
        case actionTypes.UPDATE_DPDATA_PENDING:
            const dp_pending = state.dp_content.filter(row=>row.pending && row.active)
            const dp_formated_list = dp_pending.map(
                (row)=>({
                    name: row.name,
                    address: getDataPointAddress(row,row.access.name),
                    status: null, 
                    response: null
                })
            );
            newState.dp_verify = dp_formated_list;
            break
        case actionTypes.VERIFY_DPDATA_PENDING:
            newState.dp_verify.forEach((row) => {
                if (row.name === action.dpname){
                    row.status = action.dplist.status
                    row.response = action.dplist.response
                    }
            })
            console.log("valor de VERIFY_DPDATA_PENDING", newState.dp_verify)
            break
        case actionTypes.GET_DP_DEFAULTS:
            newState.dp_defaults = {...state.dp_defaults};
            newState.dp_defaults[action.protocol] = action.defaults;
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;
