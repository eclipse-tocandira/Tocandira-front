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
