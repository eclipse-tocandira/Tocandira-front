/** This module holds the view of the React
 * component `CheckCell`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import {TableCell} from '@mui/material'

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class CheckCell extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        check_component:PropTypes.object
    };
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <TableCell padding="checkbox" size='small'>
                {this.props.check_component}
            </TableCell>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default CheckCell;