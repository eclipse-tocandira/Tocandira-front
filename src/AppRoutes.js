/** This module holds the Routes for the
 * Applications
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
 * - react-redux
 * - react-router-dom
*/

// Imports from modules;
import React from 'react';
import {connect} from 'react-redux';
import {Route, Routes, Navigate} from 'react-router-dom';
// Local imports
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import withRouter from './withRouter';
import Login from './containers/Login/Login';
import Main from './containers/Main/Main';
import * as routeNames from './routeNames'

// #######################################

/** The main Page that handles the Routing
* @property `props.auth`: Redux access to auth store */
class AppRoutes extends React.PureComponent {

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const appRoutes = (
            <Routes>
                <Route path={'/'} element={<Navigate to={routeNames.LOGIN}/>}/>
                <Route path={routeNames.LOGIN} element={<Login/>}/>
                <Route element={ <ProtectedRoute auth={this.props.auth.token_valid} redirect={'/'}/> }>
                    <Route path={routeNames.MAIN} element={<Main/>}/>
                </Route>
            </Routes>
        );
        return(appRoutes);
    };
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    auth: state.auth
});

// Make this component visible on import
export default connect(reduxStateToProps)(withRouter(AppRoutes));

