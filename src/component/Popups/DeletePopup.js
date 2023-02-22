/** This module holds the view of the React
 * component `DeletePopup`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContentText, DialogTitle, DialogActions,
    Button, DialogContent } from '@mui/material';
// Local Imports

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DeletePopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        open: PropTypes.bool,
        content: PropTypes.object,
        nameOk: PropTypes.string,
        nameCancel: PropTypes.string,
        onOkClick: PropTypes.func,
        onCancelClick: PropTypes.func
    };
    /** Defines the component state variables */
    state = {
    };
    // /** Context Definition*/
    // static contextType ;
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <Dialog open={this.props.open} scroll='paper'>
                <DialogTitle variant='h5' align='left' color='text.secondary'>
                    {this.props.content.title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {this.props.content.msg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' size='medium' color='error'
                        onClick={this.props.onOkClick}>
                        {this.props.nameOk}
                    </Button>
                    <Button variant='text' size='medium' color='inherit'
                        onClick={this.props.onCancelClick}>
                        {this.props.nameCancel}
                    </Button>
                </DialogActions>
            </Dialog>
        );
        return(jsx_component);
    }
    
}

// Make this component visible on import
export default DeletePopup;