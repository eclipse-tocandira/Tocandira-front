/** This module contains...
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules

// Local Imports

// #######################################

class BaseProtocol {

    /** Description.
    * @param ``: 
    * @returns */
    static getDSBaseState=(context,p_name) => {
        const newState = {...context.state};
        newState.info_ds = {...context.state.info_ds};
        newState.info_ds[p_name] = {...context.state.info_ds[p_name]};
        return(newState)
    }

    /** Description.
    * @param ``: 
    * @returns */
    static setDSBaseProp=(context,p_name,property,event) => {
        const newState = this.getDSBaseState(context,p_name);
        newState.info_ds[p_name][property] = event.target.value;
        context.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    static getDSProtocolState=(context,p_name) => {
        const newState = this.getDSBaseState(context,p_name);
        newState.info_ds[p_name].protocol.data = {...context.state.info_ds[p_name].protocol.data};
        return(newState)
    }

    /** Description.
    * @param ``: 
    * @returns */
    static setDSProtocolProp=(context,p_name,property,event) => {
        const newState = this.getDSProtocolState(context,p_name);
        newState.info_ds[p_name].protocol.data[property] = event.target.value;
        context.setState(newState);
    }
    
}

export default BaseProtocol