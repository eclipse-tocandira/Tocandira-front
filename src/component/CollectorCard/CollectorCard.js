/** This module holds the view of the React
 * component `CollectorCard`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react
 * - @mui/material
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { Stack, InputAdornment, TextField } from '@mui/material';

// Local Imports
import TitledCard from '../TitledCard/TitledCard'

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class CollectorCard extends React.PureComponent {
    
    /** Defines the component state variables */
    state = {
        valid_ip: true,
    }

    /** Defines the component property types */
    static propTypes = {
        ip: PropTypes.string,
        port: PropTypes.number,
        interval: PropTypes.number,
        onIpChange: PropTypes.func,
        onLooseIpFocus: PropTypes.func,
        onPortChange: PropTypes.func,
        onIntervalChange: PropTypes.func,
    };
    
    /** Watch for the enter key, call ip validation if found
     * @param event: The event that called this handler*/
     handleEnterPress=(event)=>{
        if(event.key==='Enter'){
            this.handleVadidateIP(event);
        }
    }
    /** Check for a valid IP address inserted.
    * @param event: The event that called this handler*/
     handleVadidateIP=(event) => {
        const newState = {...this.state};
        // Split IP in numbers
        const subips = event.target.value.split('.');
        // Get the invalid parts only
        const invalidSubips = subips.filter((ele,index) => {
            let valid = false;
            // Check for size
            if (index<4){
                // Check for number
                valid = /^\d+$/.test(ele);
                if (valid) {
                    const ele_int = parseInt(ele);
                    // Check for IP number range
                    valid = ele_int>=0 && ele_int<=255;
                }
            }
            return(!valid)
        })
        // Check if invalid parts are present
        newState.valid_ip = invalidSubips.length === 0
        this.setState(newState);
    }
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){

        const card_contents = [
        <Stack direction='row' spacing='1rem'>
            <TextField variant="standard"
                label="Collector IP"
                type='text'
                size='medium'
                fullWidth={true}
                value={this.props.ip}
                error={!this.state.valid_ip}
                onChange={this.props.onIpChange}
                onKeyPress={this.handleEnterPress}
                onBlur={this.handleVadidateIP}/>
            <TextField variant="standard"
                label="Port"
                type='tel'
                size='medium'
                fullWidth={true}
                value={this.props.port}
                onChange={this.props.onPortChange}/>
        </Stack>,
        <TextField variant="standard"
            label="Save Interval"
            type='tel'
            size='medium'
            InputProps={{ endAdornment: <InputAdornment position="end">seconds</InputAdornment> }}
            fullWidth={true}
            value={this.props.interval}
            onChange={this.props.onIntervalChange}/>,
        ];

        const jsx_component = (
            <TitledCard cardprops={{maxWidth:'20rem', maxHeight:'15rem'}}
                title='Data Aquisition' contents={card_contents}/>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default CollectorCard;