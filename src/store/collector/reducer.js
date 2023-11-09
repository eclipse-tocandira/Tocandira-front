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
    default: {},
    selected: {},
    validation:{
        data_error:false,
        help_text:""
    },
    list:[],
    message:null, 
    type_message:"info",
};

/** Description.
* @param ``: 
* @returns */
const selectCollector=(id,list) => list.filter((el)=>el.id===id)[0]

/** Auth reducer definition */
const reducer = (state=initialState, action) => {
    // Duplicate the state to change the Pointer
    const newState = {...state};
    // Check and select correct action
    switch ( action.type ) {
        case actionTypes.CLEAR_INVALID:
            newState.validation = {data_error: false, help_text:""}
            break
        case actionTypes.INVALID_ENTRY:
            newState.validation = {data_error: true, help_text:action.msg}
            break
        case actionTypes.SAVE_LIST:
            newState.list = [];
            for (const col of action.col_list) {
                if (col.hasOwnProperty('status')){
                    newState.list.push({...col});
                } else {
                    newState.list.push({...col,status:{}});
                }
            }
            break
        case actionTypes.SELECT_ID:
            newState.selected = {...selectCollector(action.id,state.list)};
            break
        case actionTypes.SAVE_DEFAULT_COLLECTOR:
            newState.default = {...action.defcol};
            break
        case actionTypes.MESSAGE_TEST:
            newState.message = action.message;
            newState.type_message = action.type_message;
            break
        default:
            // console.debug('[reducers/auth]',action)
            break
    }
    return(newState);
};

export default reducer;