/** This module holds the view of the React
 * component `CollectorCard`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react
 * - react-redux
 * - @mui/material
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Stack, InputAdornment, TextField } from '@mui/material';

// Local Imports
import TitledCard from '../TitledCard/TitledCard'
import * as collectorActions from '../../store/collector/actions'

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class CollectorCard extends React.PureComponent {
    
    /** Defines the component state variables */
    state = {
        ip:'127.0.0.1',
        port:4800,
        interval:12,
        valid_ip: true,
    }

    /** Defines the component property types */
    static propTypes = {
    };
    
    /** Watch for the enter key, call ip validation if found
     * @param event: The event that called this handler*/
     handleEnterPress=(event)=>{
        if(event.key==='Enter'){
            this.handlePropsUpdateWithCheck(event);
        }
    }
    /** Description.
    * @param ``: */
     handleCollectorIP=(event) => {
        const newState = {...this.state};
        newState.ip = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleCollectorInterval=(event) => {
        const newState = {...this.state};
        let num = parseInt(event.target.value);
        if (isNaN(num)){num=0};
        newState.interval = num;
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleCollectorPort=(event) => {
        const newState = {...this.state};
        let num = parseInt(event.target.value);
        if (isNaN(num)){num=0};
        newState.port = num;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handlePropsUpdateWithCheck=(event) => {
        this.handleVadidateIP(event)
        this.handlePropsUpdate()
    }
    /** Description.
    * @param ``: 
    * @returns */
    handlePropsUpdate=() => {
        if (this.state.valid_ip) {
            this.props.onPropsUpdate(this.state.ip,this.state.port,this.state.interval)
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
            // Check for number
            valid = /^\d+$/.test(ele);
            if (valid) {
                const ele_int = parseInt(ele);
                // Check for IP number range
                valid = ele_int>=0 && ele_int<=255;
            }
            return(!valid)
        })
        // Check if invalid parts are present
        newState.valid_ip = (invalidSubips.length===0) && (subips.length===4)
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
                value={this.state.ip}
                error={!this.state.valid_ip}
                onChange={this.handleCollectorIP}
                onKeyPress={this.handleEnterPress}
                onBlur={this.handlePropsUpdateWithCheck}/>
            <TextField variant="standard"
                label="Port"
                type='tel'
                size='medium'
                fullWidth={true}
                value={this.state.port}
                onChange={this.handleCollectorPort}
                onKeyPress={this.handlePropsUpdate}
                onBlur={this.handlePropsUpdate}/>
        </Stack>,
        <TextField variant="standard"
            label="Save Interval"
            type='tel'
            size='medium'
            InputProps={{ endAdornment: <InputAdornment position="end">seconds</InputAdornment> }}
            fullWidth={true}
            value={this.state.interval}
            onChange={this.handleCollectorInterval}
            onKeyPress={this.handlePropsUpdate}
            onBlur={this.handlePropsUpdate}/>,
        ];

        const jsx_component = (
            <TitledCard cardprops={{maxWidth:'20rem', maxHeight:'15rem'}}
                title='Data Aquisition' contents={card_contents}/>
        );
        return(jsx_component);
    };

    componentDidMount() {
        this.props.onGetProps(this.props.global.backend_instance)
        const newState = {...this.state};
        newState.ip = this.props.collector.ip;
        newState.port = this.props.collector.port;
        newState.interval = this.props.collector.interval;
        this.setState(newState);
    };
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    collector: state.collector
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onPropsUpdate:(ip,port,int)=>{dispatch(collectorActions.setParams(ip,port,int))},
    onGetProps:(api)=>{dispatch(collectorActions.getParams(api))}
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(CollectorCard);