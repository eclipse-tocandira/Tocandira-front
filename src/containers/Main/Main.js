/** This module holds the view of the React
 * component `Main`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react
 * - react-redux
 * - @mui/material
*/

// Imports from modules;
import React from 'react';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
// Local Imports
import './Main.css';
import * as authActions from '../../store/auth/actions'

// #######################################

/** The main page of the application
* @property `props.auth`: Redux access to auth store.
* @property `props.global`: Redux access to global store.
* @method `props.onLogoutSubmit`: Redux function for auth stote `logout` action.*/
class Main extends React.PureComponent {

    /** Defines the component state variables */
    state = {

    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <div className='Main' style={{justifyContent:'center'}}>
                <Button variant='contained'
                sx={{alignSelf:'center'}}
                color='inherit'
                fullWidth={false}
                onClick={this.props.onLogoutSubmit}>
                    LOGOUT
                </Button>
            </div>
        );
        return(jsx_component);
    };

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    auth: state.auth,
    global: state.global
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onLogoutSubmit: ()=>dispatch(authActions.logout()),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Main);