/** This module holds the view of the React
 * component `ProtectedRoute`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
 * - react-router
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { Outlet, Navigate } from 'react-router-dom';

// #######################################

/** A component to protect the routes from unauthorized access
 * @property `props.auth`: Is the user authorized?
 * @property `props.redirect`: The route to redirect the 
 * application if not authorized. */
class ProtectedRoute extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        auth: PropTypes.bool,
        redirect: PropTypes.string
    };
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        let jsx_component;

        if(!this.props.auth){
            jsx_component = <Navigate replace to={this.props.redirect}/>
        }else{
            jsx_component = <Outlet/> 
        }
        
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default ProtectedRoute;


