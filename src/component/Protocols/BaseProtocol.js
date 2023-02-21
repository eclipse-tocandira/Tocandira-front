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
    static setDSBaseProp=(context,p_name,property,only_num,event) => {
        const newState = this.getDSBaseState(context,p_name);
        let value = event.target.value;
        if (only_num){
            value = parseInt(event.target.value);
            if (isNaN(value)){value=0};
        }
        newState.info_ds[p_name][property] = value;
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
    static setDSProtocolProp=(context,p_name,property,only_num,event) => {
        const newState = this.getDSProtocolState(context,p_name);
        let value = event.target.value;
        if (only_num){
            value = parseInt(event.target.value);
            if (isNaN(value)){value=0};
        }
        newState.info_ds[p_name].protocol.data[property] = value;
        context.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    static getDPBaseState=(context,p_name) => {
        const newState = {...context.state};
        newState.info_dp = {...context.state.info_dp};
        newState.info_dp[p_name] = {...context.state.info_dp[p_name]};
        return(newState)
    }

    /** Description.
    * @param ``: 
    * @returns */
    static setDPBaseProp=(context,p_name,property,only_num,event) => {
        const newState = this.getDPBaseState(context,p_name);
        let value = event.target.value;
        if (only_num){
            value = parseInt(event.target.value);
            if (isNaN(value)){value=0};
        }
        newState.info_dp[p_name][property] = event.target.value;
        context.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    static getDPProtocolState=(context,p_name) => {
        const newState = this.getDPBaseState(context,p_name);
        newState.info_dp[p_name].access.data = {...context.state.info_dp[p_name].access.data};
        return(newState)
    }

    /** Description.
    * @param ``: 
    * @returns */
    static setDPProtocolProp=(context,p_name,property,only_num,event) => {
        const newState = this.getDPProtocolState(context,p_name);
        let value = event.target.value;
        if (only_num){
            value = parseInt(event.target.value);
            if (isNaN(value)){value=0};
        }
        newState.info_dp[p_name].access.data[property] = value;
        context.setState(newState);
    }
    
}

export default BaseProtocol