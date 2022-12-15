
/** This module holds the view of the React
 * component `CustomAlert`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
 * - @mui/material
 * - @mui/icons-material 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { AlertTitle, Alert, IconButton, Card, Collapse } from '@mui/material';
import { Close } from '@mui/icons-material';

// #######################################

/** A component to encapsulate the mui Alert component in a simple way.
 * @property `props.type`: One of [`"error"`, `"info"`, `"success"`, `"warning"`].
 * @property `props.msg`: The message to exibit.
 * @property `props.title`: Insert a Title in the Alert if set.
 * @property `props.elevate`: Elevate the Alert like a Card if set. */
class CustomAlert extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        type: PropTypes.string,
        elevate: PropTypes.bool,
        title: PropTypes.string,
        msg: PropTypes.string
    };
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        
        // Create the closing icon
        const closeIcon = <IconButton aria-label="close" color="inherit" size="small"
            onClick={this.props.reset}>
                <Close fontSize="inherit" />
            </IconButton>
        // Create the title if set in properties
        let title = null;
        if (this.props.title!==undefined){
            title = <AlertTitle>{this.props.title}</AlertTitle>
        }
        // Build the main component
        let jsx_component = (
            <Alert severity={this.props.type} action={closeIcon}>
                {title}
                {this.props.msg}
            </Alert>
        );
        // Add a Card to it if configured to
        if (this.props.elevate){
            jsx_component = <Card>{jsx_component}</Card>
        }

        return(jsx_component);
    };
    
}

// Make this component visible on import
export default CustomAlert;

