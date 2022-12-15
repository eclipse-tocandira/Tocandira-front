/** This module holds the view of the React
 * component `Login`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
 * - react-redux
 * - react-router-dom
 * - @mui/material
*/

// Imports from modules
import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, Card, Typography, CardContent,
    TextField, Grid, CardMedia } from '@mui/material'
// Local Imports
import './Login.css';
import * as authActions from '../../store/auth/actions'
import * as routeNames from '../../routeNames'

// #######################################

/** The login screen and the App entrypoint.
 * @property `props.auth`: Redux access to auth store.
 * @property `props.global`: Redux access to global store.
 * @method `props.onLoginSubmit`: Redux function for auth store `login` action.
 * @method `props.handleUsernameInput`: Save username entry in state as typed.
 * @method `props.handlePasswordInput`: Save password entry in state as typed. */
class Login extends React.PureComponent {
    
    /** Defines the component state variables */
    state = {
        login:{
            username:"",
            password:""
        }
    }

    /** Save the username to component state as typed */
    handleUsernameInput=(event) => {
        const newState = {...this.state};
        newState.login = {...this.state.login};
        newState.login.username = event.target.value;
        this.setState(newState);
    }
    /** Save the password to component state as typed */
    handlePasswordInput=(event) => {
        const newState = {...this.state};
        newState.login = {...this.state.login};
        newState.login.password = event.target.value;
        this.setState(newState);
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */ 
    render(){

        // Check if the user has a stored token
        let authorized = null;
        if (this.props.auth.token!==null){
            // Send him to the main page
            authorized = <Navigate to={routeNames.MAIN}/>
        }

        // Build the component to return
        const jsx_component = (
            <div className='Login'>
            {authorized}
            <Grid container className='Login_grid' direction="column" spacing={'1rem'} > 
                {/* Aimirim Logo */}
                <Grid item>
                    <CardMedia component="img" image={process.env.PUBLIC_URL+'/aimirim_Qsmall.png'} alt="Company Logo"/>
                </Grid>

                <Grid item>
                    <Card sx={{borderRadius:'3%'}}>
                        <CardContent>
                            <Grid container spacing='1rem' direction="column" alignItems="stretch">
                                {/* Card Title */}
                                <Grid item> <Typography variant='h5'
                                    align='left'
                                    color='text.secondary'>
                                        Login 
                                    </Typography>
                                </Grid>
                                {/* Card subtitle */}
                                <Grid item marginTop='-1rem'> <Typography variant='subtitle1'
                                    align='left'
                                    color='text.secondary'>
                                        Historian Configuration Tool
                                    </Typography>
                                </Grid>
                                {/* Username prompt */}
                                <Grid item> <TextField variant="outlined"
                                    label="Username"
                                    type='text'
                                    fullWidth={true}
                                    value={this.state.login.username}
                                    error={this.props.auth.validation.error}
                                    onChange={this.handleUsernameInput}>
                                    </TextField>
                                </Grid>
                                {/* Password prompt */}
                                <Grid item> <TextField variant="outlined"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    fullWidth={true}
                                    value={this.state.login.password}
                                    onChange={this.handlePasswordInput}
                                    error={this.props.auth.validation.error}
                                    helperText={this.props.auth.validation.help_text}>
                                    </TextField>
                                </Grid>
                                {/* Login Button */}
                                <Grid item marginTop='1rem'> <Button variant="contained"
                                    color='primary'
                                    size='medium'
                                    fullWidth={true}
                                    onClick={this.props.onLoginSubmit.bind(this, this.props.global.backend_instance, this.state.login)}>
                                        LOGIN
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
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
    onLoginSubmit: (api_instance,usrdata)=>dispatch(authActions.login(api_instance,usrdata))
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Login);