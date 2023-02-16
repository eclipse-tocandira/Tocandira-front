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
    open_ds:false,
    open_dp:false,
    notifications: [],
};

/** Auth reducer definition */
const reducer = (state=initialState, action) => {
    // Duplicate the state to change the Pointer
    const newState = {...state};
    // Check and select correct action
    switch ( action.type ) {
        case actionTypes.OPEN_DATASOURCE:
            newState.open_ds = action.open;
            break
        case actionTypes.OPEN_DATAPOINT:
            newState.open_dp = action.open;
            break
        case actionTypes.ADD_ALERT:
            newState.notifications = [...state.notifications,
                {key: action.key, ...action.notification},
            ];
            break
        case actionTypes.REMOVE_ALERT:
            newState.notifications = state.notifications.filter(
                notification => notification.key !== action.key,
            );
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;