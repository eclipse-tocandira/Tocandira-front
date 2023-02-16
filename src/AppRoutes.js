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
import {withSnackbar} from 'notistack';
import {Route, Routes, Navigate} from 'react-router-dom';
// Local imports
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import withRouter from './withRouter';
import Login from './containers/Login/Login';
import Main from './containers/Main/Main';
import * as routeNames from './routeNames'
import * as popupsActions from './store/popups/actions'

// #######################################

/** The main Page that handles the Routing
* @property `props.auth`: Redux access to auth store */
class AppRoutes extends React.PureComponent {

    /** Defines the component state variables */
    state = {
        displayed:[]
    }

    /** Description. */
    handleAlertDisplayed = (id) => {
        const newState = {...this.state};
        newState.displayed = [...this.state.displayed, id];
        this.setState(newState);
    };

    /** Description. */
    handleAlertClear = () => {
        const newState = {...this.state};
        newState.displayed = [];
        this.setState(newState);
    };

    /** Description. */
    handleAlertRemove = (id) => {
        const newState = {...this.state};
        newState.displayed = [...this.state.displayed.filter(key => id !== key)];
        this.setState(newState);
    };

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

    /** Description. */
    buildNotification=({key, message, options = {}, dismissed = false}) => {
        if (dismissed) {
            // Property added from `withSnackbar` wrapper
            this.props.closeSnackbar(key);
            return;
        }

        // do nothing if snackbar is already displayed
        if (this.state.displayed.includes(key)){
            return;
        };

        // Property added from `withSnackbar` wrapper
        this.props.enqueueSnackbar(message, { key, ...options,
            onClose: (event, reason, myKey) => {
                if (options.onClose) {
                    options.onClose(event, reason, myKey);
                }
            },
            onExited: (event, myKey) => {
                this.props.onRemoveAlert(myKey);
                this.handleAlertRemove.bind(this,myKey);
            },
        });

        // keep track of snackbars that we've displayed
        this.handleAlertDisplayed(key);
    }

    componentDidUpdate() {
        this.props.popups.notifications.forEach(this.buildNotification);
    }

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    auth: state.auth,
    popups: state.popups
});

const reduxDispatchToProps = (dispatch) =>({
    onRemoveAlert: (myKey)=>dispatch(popupsActions.removeSnackbar(myKey)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(withRouter(withSnackbar(AppRoutes)));

