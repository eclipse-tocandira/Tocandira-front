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
import { Stack, InputAdornment, TextField, Button, Box } from '@mui/material';

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
        valid_ip: true,
    }

    /** Defines the component property types */
    static propTypes = {
    };
    
    /** Watch for the enter key, call ip validation if found
     * @param event: The event that called this handler*/
    handleEnterPress=(event)=>{
        if(event.key==='Enter'){
            this.handleVadidateIP(event);
        }
    }
    /** Description.
    * @param ``: */
    handleSaveClick=() => {
        this.props.onPropsSave(this.props.global.backend_instance,{
            ip:this.props.collector.ip,
            port:this.props.collector.port,
            update_period:this.props.collector.interval,
            timeout:this.props.collector.interval
        })
    }
    /** Description.
    * @param ``: */
    handleCollectorIP=(event) => {
        this.props.onSetIp(event.target.value)
    }
    /** Description.
    * @param ``: */
    handleCollectorPort=(event) => {
        let num = parseInt(event.target.value);
        if (isNaN(num)){num=0};
        this.props.onSetPort(num);
    }
    /** Description.
    * @param ``: */
    handleCollectorInterval=(event) => {
        let num = parseInt(event.target.value);
        if (isNaN(num)){num=0};
        this.props.onSetInterval(num);
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
                value={this.props.collector.ip}
                error={!this.state.valid_ip}
                onChange={this.handleCollectorIP}
                onKeyPress={this.handleEnterPress}
                onBlur={this.handleVadidateIP}/>
            <TextField variant="standard"
                label="Port"
                type='tel'
                size='medium'
                fullWidth={true}
                value={this.props.collector.port}
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
            value={this.props.collector.interval}
            onChange={this.handleCollectorInterval}
            onKeyPress={this.handlePropsUpdate}
            onBlur={this.handlePropsUpdate}/>,
            
        <Box justifyContent='flex-end' display='flex'>
        <Button variant='contained' fullWidth={false} size='small' color='primary'
            onClick={this.handleSaveClick} disabled={!this.state.valid_ip}> 
            SAVE 
        </Button>
        </Box>
        ];

        const jsx_component = (
            <TitledCard cardprops={{maxWidth:'20rem', maxHeight:'15rem'}}
                title='Data Aquisition' contents={card_contents}/>
        );
        return(jsx_component);
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
    onPropsSave:(api,info)=>{dispatch(collectorActions.putParams(api,info))},
    onSetIp:(ip)=>{dispatch(collectorActions.setIp(ip))},
    onSetPort:(port)=>{dispatch(collectorActions.setPort(port))},
    onSetInterval:(int)=>{dispatch(collectorActions.setInterval(int))},
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(CollectorCard);