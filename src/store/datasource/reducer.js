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
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;