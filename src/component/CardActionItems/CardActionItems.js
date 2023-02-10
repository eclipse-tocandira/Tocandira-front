/** This module holds the view of the React
 * component `CardActionItems`
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
import {Stack, Button} from '@mui/material'

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class CardActionItems extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        spacing:PropTypes.string,
        enable_del_edit:PropTypes.bool,
        onNewClick:PropTypes.func,
        onEditClick:PropTypes.func,
        onDeleteClick:PropTypes.func
    };
    /** Defines the default values for properties */
    static defaultProps = {
        spacing:'1rem',
        enable_del_edit:false
    }
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <Stack direction='row' spacing={this.props.spacing}>
                <Button variant='contained' size='small' color='primary'
                    onClick={this.props.onNewClick}>
                    NEW
                </Button>
                <Button variant='contained' size='small' color='primary'
                    disabled={this.props.enable_del_edit}
                    onClick={this.props.onEditClick}>
                    EDIT
                </Button>
                <Button variant='contained' size='small' color='primary'
                    disabled={this.props.enable_del_edit}
                    onClick={this.props.onDeleteClick}>
                    DELETE
                </Button>
            </Stack>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default CardActionItems;