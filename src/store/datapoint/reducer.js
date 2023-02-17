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
    dp_verify:[]
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
            newState.list_verify = state.dp_content.map(
                (row)=>({
                    name:row.name,
                    address:getDataPointAddress(row,row.access.name),
                    status: null, response: null
                })
            );
            break
        case actionTypes.CONFIRM_DPDATA_PENDING:
            newState.dp_verify.map((row) => {
                if (row.name === action.dpname){
                    row.status = action.dplist.status
                    row.response = action.dplist.response
                }
            })
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;