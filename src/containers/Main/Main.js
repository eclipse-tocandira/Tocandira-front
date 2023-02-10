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
import { Stack, Button, Card, CardContent, Typography, CardActions } from '@mui/material';
// Local Imports
import './Main.css';
import * as authActions from '../../store/auth/actions'
import * as globalActions from '../../store/global/actions'
import CollectorCard from '../../component/CollectorCard/CollectorCard';
import DataSourceCard from '../../component/DataSourceCard/DataSourceCard';
import DataPointCard from '../../component/DataPointCard/DataPointCard';

// #######################################

/** The main page of the application
* @property `props.auth`: Redux access to auth store.
* @property `props.global`: Redux access to global store.
* @method `props.onLogoutSubmit`: Redux function for auth stote `logout` action.*/
class Main extends React.PureComponent {

    /** Defines the component state variables */
    state = {
        collector:{
            ip:'127.0.0.1',
            valid_ip:true,
            port:4800,
            interval:12
        }
    }

    /** Description.
    * @param ``: */
    handleLogoutSubmission=() => {
        this.props.onTokenInvalid()
        this.props.onLogoutSubmit()
    }
    /** Description.
    * @param ``: */
    handleCollectorIP=(event) => {
        const newState = {...this.state};
        newState.collector = {...this.state.collector};
        newState.collector.ip = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleCollectorInterval=(event) => {
        const newState = {...this.state};
        newState.collector = {...this.state.collector};
        newState.collector.interval = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleCollectorPort=(event) => {
        const newState = {...this.state};
        newState.collector = {...this.state.collector};
        newState.collector.port = event.target.value;
        this.setState(newState);
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <div className='Main'>
            
                <Button variant='contained'
                    sx={{margin:'1rem', alignSelf:'flex-end'}}
                    size='large'
                    color='inherit'
                    fullWidth={false}
                    onClick={this.handleLogoutSubmission}>
                        LOGOUT
                </Button>

            <Stack direction='column' flexGrow='1' alignItems='stretch'>
                <Typography variant='h3'
                    align='left'
                    color='white'
                    margin='1rem 0 1rem 0'>
                        Main Configurations 
                </Typography>

                <Card className='MainCard'>
                    <CardContent>
                        <Stack spacing='5rem' direction='column'>
                            <Stack direction='row' spacing='5rem'>
                                <CollectorCard
                                    ip={this.state.collector.ip}
                                    port={this.state.collector.port}
                                    interval={this.state.collector.interval}
                                    timeout={this.state.collector.timeout}
                                    onIpChange={this.handleCollectorIP}
                                    onPortChange={this.handleCollectorPort}
                                    onIntervalChange={this.handleCollectorInterval}/>
                                <DataSourceCard/>
                            </Stack>
                        <DataPointCard/>
                        </Stack>
                    </CardContent>
                    <CardActions>
                    <Stack direction='row' spacing='2rem' margin='1rem'>
                        <Button variant='contained'
                        size='large'
                        color='primary'>
                            APPLY
                        </Button>

                        <Button variant='contained'
                        size='large'
                        color='inherit'>
                            RESET
                        </Button>
                    </Stack>
                    </CardActions>
                </Card>
            </Stack>
            </div>
        );
        return(jsx_component);
    };

    componentDidMount() {
        if (this.props.auth.token_valid){
            this.props.onTokenValid(this.props.auth.token, this.props.auth.token_type)
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
    onLogoutSubmit: ()=>dispatch(authActions.logout()),
    onTokenInvalid: ()=>dispatch(globalActions.clearAuthToken()),
    onTokenValid: (token,token_type)=>dispatch(globalActions.setAuthToken(token,token_type)),
    onCheckToken: (api_instance)=>dispatch(authActions.validate(api_instance)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Main);