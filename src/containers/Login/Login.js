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
    TextField, Grid, CardMedia, Collapse } from '@mui/material'
// Local Imports
import './Login.css';
import * as authActions from '../../store/auth/actions'
import * as routeNames from '../../routeNames'
import CustomAlert from '../../component/CustomAlert/CustomAlert'

// #######################################

/** The login screen and the App entrypoint.
 * @param props.auth: Redux access to auth store.
 * @param props.global: Redux access to global store.
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

    /** Set an element to be the intial focus of the screen
     * @param ele: Reference to the element */
    focusThisElement=(ele)=>{
        this.focalElement = ele;
    }

    /** Save the username to component state as typed 
     * @param event: The event that called this handler */
    handleUsernameInput=(event) => {
        const newState = {...this.state};
        newState.login = {...this.state.login};
        newState.login.username = event.target.value;
        this.setState(newState);
    }
    /** Save the password to component state as typed 
     * @param event: The event that called this handler */
    handlePasswordInput=(event) => {
        const newState = {...this.state};
        newState.login = {...this.state.login};
        newState.login.password = event.target.value;
        this.setState(newState);
    }
    /** Watch for the enter key, call login submission if caught
     * @param event: The event that called this handler*/
    handleEnterPress=(event)=>{
        if(event.key==='Enter'){
            this.handleLoginSubmit();
        }
    }
    /** Submit the username and passord information to login */
    handleLoginSubmit=()=>{
        // NOTE: This hides the errors prior to a new login request.
        //       It is important so the user can see that it recieved
        //       a new error and not the same as before.
        this.props.onClearError();
        this.props.onLoginSubmit(this.props.global.backend_instance, this.state.login);
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */ 
    render(){

        // Prepare alert component to show a message to the user
        const alert = <CustomAlert type='error' elevate
            reset={this.props.onClearError}
            msg={this.props.auth.validation.help_text}/>

        // Check if the user has a stored token
        let authorized = null;
        if (this.props.auth.token_valid){
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
                                    error={this.props.auth.validation.data_error}
                                    onChange={this.handleUsernameInput}
                                    onKeyPress={this.handleEnterPress}
                                    inputRef={this.focusThisElement}>
                                    </TextField>
                                </Grid>
                                {/* Password prompt */}
                                <Grid item> <TextField variant="outlined"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    fullWidth={true}
                                    value={this.state.login.password}
                                    error={this.props.auth.validation.data_error}
                                    onChange={this.handlePasswordInput}
                                    onKeyPress={this.handleEnterPress}>
                                    </TextField>
                                </Grid>
                                {/* Login Button */}
                                <Grid item marginTop='1rem'> <Button variant="contained"
                                    color='primary'
                                    size='medium'
                                    fullWidth={true}
                                    onClick={this.handleLoginSubmit}>
                                        LOGIN
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Descriptive Error Indicator */}
                <Grid item>
                    <Collapse in={this.props.auth.validation.error}>{alert}</Collapse>
                </Grid>
            </Grid>
            </div>
        );
        return(jsx_component);
    };

    /** Component lifecycle CREATION ending */
    componentDidMount() {
        if (this.focalElement!==undefined){
            this.focalElement.focus()
        }
    };
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    auth: state.auth,
    global: state.global
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onLoginSubmit: (api_instance,usrdata)=>dispatch(authActions.login(api_instance,usrdata)),
    onClearError: ()=>dispatch(authActions.clearInvalid())
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Login);