/** This module holds the `Pooling` class
 * 
 * Copyright (c) 2017 Aimirim STI.
*/

// Imports from modules;

// Local Imports

// #######################################

/** Perform a safe Pooling strategy on a given function and
* the results are parsed into a given callback.
* @property `props`: Optional object to control pooling options:
* -  `pooling_time`: The time to wait 
* between executions in ms. Default is 1000.
* - `loop_func`: The async function to call.
* Defaults to empty function.
* - `callback_func`: The function to recieve
* the `loop_func` result. Defaults to empty function.
* @method `start`: Begin pooling the `loop_func` and returning the result to `callback_func`
* @method `stop`: Stop pooling. */
class Pooling {
    
    // Class initialization
    constructor(props){
        // Default property values
        this.props = {
            pooling_time: 1000,
            loop_func: ()=>{},
            callback_func: (res)=>{},
        };
        // Overwrite with new properties
        this.props = {...this.props, ...props}
        // Default state values
        this.state = {
            timer_id: null,
            keep_alive: false,
        };
    }

    /** Internal function to clear the exiting timer if any. */
    _clearExistingTimer=() => {
        if (this.state.timer_id!==null) clearTimeout(this.state.timer_id);
    }

    /** Internal function to save the Timer's ID in class state.
    * @param `id` (int): The timeout identification number. Set `null` to
    deactivate.*/
    _saveTimer=(id) => {
        this._clearExistingTimer()
        this.state.timer_id = id;
    }

    /** Internal function to save the pooling status in class state.
    * @param `val` (bool): Allow the pooling to continue.*/
    _toggleStatus=(val) => {
        this.state.keep_alive = val;
    }

    /** Internal function to Execute the loop. */
    _loop=async() => {
        const result = await this.props.loop_func();
        if (this.state.keep_alive) {
            const timeout_id = setTimeout(()=>(this._loop()),this.props.pooling_time);
            this._saveTimer(timeout_id);
            this.props.callback_func(result);
        }   
    }
    
    /** Start pooling. */
    start=() => {
        this._clearExistingTimer();
        this._toggleStatus(true);
        this._loop();
    }
    
    /** Stop pooling. */
    stop=() => {
        this._toggleStatus(false);
        this._saveTimer(null);
    }

}

// Make this component visible on import
export default Pooling;