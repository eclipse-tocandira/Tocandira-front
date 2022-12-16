/** This module contains the implementation
 * of the actions accepted by global redux
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Local Imports
import * as actionTypes from './actionTypes'

// #######################################

/** Redux action to load the json configurations */
export const setConfig = (conf) =>({type:actionTypes.SET_CONF, conf:conf});

/** Redux action to add the authentication header to the backend intance */
export const setAuthToken = (token,token_type) =>({type:actionTypes.SET_AUTH, token:token, token_type:token_type});

/** Redux action to remove the authentication header from backend intance */
export const clearAuthToken = () =>({type:actionTypes.UNSET_AUTH});
