/** This module holds the view of the React
 * component `SimpleIconMenu`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem, Tooltip, ClickAwayListener } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// Local Imports
//import './SimpleIconMenu.css';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class SimpleIconMenu extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        title: PropTypes.string,
        style: PropTypes.object,
        items: PropTypes.array,
        icon: PropTypes.any
    };
    /** Defines the component state variables */
    state = {
        open:false,
        anchorEl: null,
    };

    handleClose=() => {
        const newState = {...this.state};
        newState.open = false;
        newState.anchorEl = null;
        this.setState(newState);
    };
    
    /** Description.
    * @param ``: 
    * @returns */
    handleOpen=(event) => {
        const newState = {...this.state};
        newState.open = true;
        newState.anchorEl = event.currentTarget;    
        this.setState(newState);
    }
    
    /** Description.
    * @param ``: 
    * @returns */
    handleItemClick=(callback) => {
        if(callback){ callback() }
        this.handleClose();
    }

    /** Description.
    * @param ``: 
    * @returns */
    buildMenuItems=(ele,index) => (
        <MenuItem onClick={this.handleItemClick.bind(this,ele.callback)} key={index}>
            {ele.item}
        </MenuItem>
    )

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        let menu_content = null;
        if (this.props.items){
            menu_content = this.props.items.map(this.buildMenuItems);
        }
        let menu_icon = <MoreVertIcon/>;
        if (this.props.icon){
            menu_icon = this.props.icon;
        }

        const jsx_component = (
        <ClickAwayListener onClickAway={this.handleClose}>
            <div style={this.props.style}>
                <Tooltip title={this.props.title} disableInteractive>
                    <IconButton color='inherit' onClick={this.handleOpen}>
                        {menu_icon}
                    </IconButton>
                </Tooltip>
                
                <Menu open={this.state.open} anchorEl={this.state.anchorEl} onClose={this.handleClose}
                    anchorOrigin={{vertical: 'center',horizontal: 'right'}}
                    transformOrigin={{vertical: 'top',horizontal: 'right'}}>
                    {menu_content}
                </Menu>
            </div>
        </ClickAwayListener>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default SimpleIconMenu;