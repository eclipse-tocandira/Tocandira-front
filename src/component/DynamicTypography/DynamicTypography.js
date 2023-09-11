/** This module holds the view of the React
 * component `DynamicTypography`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import { createTheme, responsiveFontSizes, ThemeProvider, Typography } from '@mui/material';
// Local Imports
//import './DynamicTypography.css';

// #######################################

let theme = createTheme();
theme = responsiveFontSizes(theme);

/** Description
* @property `props.`:
* @method `props.`: */
class DynamicTypography extends React.PureComponent {
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <ThemeProvider theme={theme}>
                <Typography {...this.props}>
                    {this.props.children}
                </Typography>
            </ThemeProvider>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default DynamicTypography;
