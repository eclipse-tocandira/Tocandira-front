/** This module holds the view of the React
 * component `PassCheck`
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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Button, Card, Typography, CardContent,
    TextField, Grid, CardMedia } from '@mui/material'
// Local Imports
import './PassCheck.css';
import * as authActions from '../../store/auth/actions'
import * as routeNames from '../../routeNames'

// #######################################

/** The PassCheck screen and the App entrypoint.
 * @param props.auth: Redux access to auth store.
 * @param props.global: Redux access to global store.
 * @method `props.handleUsernameInput`: Save username entry in state as typed.
 * @method `props.handlePasswordInput`: Save password entry in state as typed. */
class PassCheck extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        auth: PropTypes.object,
        global: PropTypes.object,
    }
    /** Defines the component state variables */
    state = {
        login_change:{
            name:null,
            new_password:"",
        },
    }

    /** Set an element to be the intial focus of the screen
     * @param ele: Reference to the element */
    focusThisElement=(ele)=>{
        this.focalElement = ele;
    }

    /** Save the username to component state as typed 
     * @param event: The event that called this handler */
    handleUsername=() => {
        const newState = {...this.state};
        newState.login_change.name = this.props.auth.name;
        this.setState(newState);
    }
    /** Save the password to component state as typed 
     * @param event: The event that called this handler */
    handlePasswordInput=(event) => {
        const newState = {...this.state};
        newState.login_change = {...this.state.login_change};
        newState.login_change.new_password = event.target.value;
        this.setState(newState);
    }
    /** Watch for the enter key, call login submission if caught
     * @param event: The event that called this handler*/
    handleEnterPress=(event)=>{
        if(event.key==='Enter'){
            this.handlePasswordChange()
        }
    }
    /** Description.
    * @param ``: 
    * @returns */
    handlePasswordChange=() => {
        this.props.onPassChange(this.props.global.backend_instance,this.state.login_change)
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */ 
    render(){          

        // Check if the user has a stored token
        let authorized = null;
        if (this.props.auth.token_valid & this.props.auth.change_password===false){
            // Send him to the main page
            authorized = <Navigate to={routeNames.MAIN}/>
        }
        
        // Build the component to return
        const jsx_component = (
            <div className='PassCheck' key={'PassScreen'}>
            {authorized}
            <Grid container className='PassCheck_grid' direction="column" spacing={'1rem'} > 
                {/* Aimirim Logo */}
                <Grid item>
                    <CardMedia component="img" image={'./Aimirim.svg'} alt="Company Logo"/>
                </Grid>

                <Grid item>
                    <Card sx={{borderRadius:'3%'}}>
                        <CardContent>
                            <Grid container spacing='1rem' direction="column" alignItems="stretch">
                                {/* Card Title */}
                                <Grid item> <Typography variant='h5'
                                    align='left'
                                    color='text.secondary'>
                                        First Login
                                    </Typography>
                                </Grid>
                                {/* Card subtitle */}
                                <Grid item marginTop='-1rem'> <Typography variant='subtitle1'
                                    align='left'
                                    color='text.secondary'>
                                        Please enter a new password
                                    </Typography>
                                </Grid>
                                {/* Password prompt */}
                                <Grid item> <TextField variant="outlined"
                                    label="New Password"
                                    type="password"
                                    fullWidth={true}
                                    value={this.state.login_change.new_password}
                                    inputRef={this.focusThisElement}
                                    onChange={this.handlePasswordInput}
                                    onKeyPress={this.handleEnterPress}>
                                    </TextField>
                                </Grid>
                                {/* Skip and Change Buttons */}
                                <Grid container padding='1rem 0 0 1rem' spacing='1rem' direction="row">
                                    <Grid item xs={6}> <Button variant='text'
                                        fullWidth={true}
                                        color='primary'
                                        size='medium'
                                        onClick={this.props.onPassChangeSkip}>
                                            SKIP
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6} > <Button variant="contained"
                                        fullWidth={true}
                                        color='primary'
                                        size='medium'
                                        onClick={this.handlePasswordChange}>
                                            CHANGE
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            </div>
        );
        return(jsx_component);
    }

    /** Component lifecycle CREATION ending */
    componentDidMount() {
        if (this.focalElement!==undefined){
            this.focalElement.focus()
        }
        if (this.state.login_change.name===null){
            this.handleUsername()
        }
    }
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    auth: state.auth,
    global: state.global
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onPassChange: (api_instance,new_pass)=>dispatch(authActions.changePassword(api_instance,new_pass)),
    onPassChangeSkip: ()=>dispatch(authActions.bypassPasswordChange()),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(PassCheck);