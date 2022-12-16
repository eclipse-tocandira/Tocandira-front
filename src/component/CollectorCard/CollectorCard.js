/** This module holds the view of the React
 * component `CollectorCard`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react
 * - 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@mui/material';

// Local Imports
import TitledCard from '../TitledCard/TitledCard'

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class CollectorCard extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        ip: PropTypes.string,
        interval: PropTypes.number,
        timeout: PropTypes.number,
        onIpChange: PropTypes.func,
        onIntervalChange: PropTypes.func,
        onTimeoutChange: PropTypes.func,
    };
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){

        const card_contents = [
        <TextField variant="standard"
            label="Data Collector IP Address"
            type='text'
            size='medium'
            fullWidth={true}
            value={this.props.ip}
            onChange={this.props.onIpChange}/>,
        <TextField variant="standard"
            label="Save Interval"
            type='number'
            size='medium'
            InputProps={{ endAdornment: <InputAdornment position="end">seconds</InputAdornment> }}
            fullWidth={true}
            value={this.props.interval}
            onChange={this.props.onIntervalChange}/>,
        <TextField variant="standard"
            label="Time-Out Interval"
            type='number'
            size='medium'
            InputProps={{ endAdornment: <InputAdornment position="end">seconds</InputAdornment> }}
            fullWidth={true}
            value={this.props.timeout}
            onChange={this.props.onTimeoutChange}/>,
        ];

        const jsx_component = (
            <TitledCard cardprops={{maxWidth:'20rem', maxHeight:'18rem'}}
                title='Data Aquisition' contents={card_contents}/>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default CollectorCard;