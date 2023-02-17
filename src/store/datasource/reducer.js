/** This module contains the auth
 * reducer build and configuration
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Local Imports
import * as actionTypes from './actionTypes'

// #######################################

/** Initial state of the auth redux */
const initialState = {
    ds_content:[],
    protocol_avail:[],
    protocol_default:"",
    ds_defaults:{}
};

/** Auth reducer definition */
const reducer = (state=initialState, action) => {
    // Duplicate the state to change the Pointer
    const newState = {...state};
    // Check and select correct action
    switch ( action.type ) {
        case actionTypes.GET_DSDATA:
            newState.ds_content = [...action.dslist];
            break
        case actionTypes.GET_AVAIL_PROTOCOLS:
            newState.protocol_avail = [...action.protocols.menuItems];
            newState.protocol_default = action.protocols.defaultValue;
            break
        case actionTypes.GET_DS_DEFAULTS:
            newState.ds_defaults = {...state.ds_defaults};
            newState.ds_defaults[action.protocol] = action.defaults;
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;