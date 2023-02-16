/** This module holds the view of the React
 * component `FormPopup`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, Slide } from '@mui/material';
// Local Imports

// #######################################


/** Description
 * @property ``
 * @returns */
function downAnimationFunction (props, ref) {
// HACK: This function needs to be external to the class 
//       that use this animation. Reason is unknown for me,
//       but the behaviour and the solution can be found in:
//       https://github.com/mui/material-ui/issues/9116
    return <Slide direction='down' ref={ref} {...props} />;
};
// This constant also needs to be outside the class component
const down_animation = React.forwardRef(downAnimationFunction);

/** Description
* @property `props.`:
* @method `props.`: */
class FormPopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        open:PropTypes.bool,
        title:PropTypes.string,
        cardWidth:PropTypes.string,
        nameOk:PropTypes.string,
        nameCancel:PropTypes.string,
        onOkClick:PropTypes.func,
        onCancelClick:PropTypes.func,
    };

    static defaultProps = {
        cardWidth:'sx',
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        
        const jsx_component = (
                <Dialog open={this.props.open} scroll='paper' fullWidth maxWidth={this.props.cardWidth}
                    TransitionComponent={down_animation} PaperProps={{sx:{alignSelf:'flex-start'}}}>
                    <DialogTitle variant='h5' align='left' color='text.secondary'>
                        {this.props.title}
                    </DialogTitle>
                    <DialogContent>
                        <FormControl sx={{margin:'0.5rem'}} fullWidth>
                            {this.props.children}
                        </FormControl>
                    </DialogContent>
                    <DialogActions sx={{margin:'0.5rem'}}>
                        <Button variant='text' size='medium' color='primary'
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
    };
    
}

// Make this component visible on import
export default FormPopup;