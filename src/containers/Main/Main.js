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
import * as authActions from '../../store/auth/actions';
import * as globalActions from '../../store/global/actions';
import * as popupsActions from '../../store/popups/actions';
import * as datapointActions from '../../store/datapoint/actions';
import * as datasourceActions from '../../store/datasource/actions';
import CollectorCard from '../../component/CollectorCard/CollectorCard';
import DataSourceCard from '../../component/DataSourceCard/DataSourceCard';
import DataPointCard from '../../component/DataPointCard/DataPointCard';
import VerifyPopup from '../../component/Popups/VerifyPopup';

// #######################################

/** The main page of the application
* @property `props.auth`: Redux access to auth store.
* @property `props.global`: Redux access to global store.
* @method `props.onLogoutSubmit`: Redux function for auth stote `logout` action.*/
class Main extends React.PureComponent {

    /** Defines the component state variables */
    state = {
    }

    /** Description.
    * @param ``: */
    handleLogoutSubmission=() => {
        this.props.onTokenInvalid()
        this.props.onLogoutSubmit()
    }

    /** Description.
    * @param ``: */
    handleClickVerify=() => {
        this.props.onUpdateDataPending()
        this.props.onVerify(true)
    }
    /** Description.
    * @param ``: 
    * @returns */
    handlePopUpLeave=() => {
        this.props.onGetDataPoint(this.props.global.backend_instance);
        this.props.onVerify(false);
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){

        // NOTE: The onClick event in Main <div> will be executed
        //       after any Click on configuration screen by "bubbling",
        //       this is the easiest way to perform a continuous token
        //       check and logout the user when it becomes invalid.
        const jsx_component = (
            <div className='Main' onClick={this.props.onCheckToken.bind(this,this.props.global.backend_instance)}>
                <VerifyPopup open={this.props.popups.open_verify} onClose={this.handlePopUpLeave}/>
            
                <Stack  direction='column' justifyContent='space-between'>

                    <Stack  direction='column' spacing='2rem' margin='3rem 1rem'>
                        <Typography variant='h3'>&nbsp;</Typography>

                        <Button variant='contained' fullWidth={false}
                            size='large' color='primary'>
                            APPLY
                        </Button>

                        <Button variant='contained' fullWidth={false}
                            size='large' color='inherit'>
                            RESET
                        </Button>

                        <Button variant='contained' fullWidth={false}
                            size='large' color='success' onClick={this.handleClickVerify}>
                            VERIFY
                        </Button>
                    </Stack>

                </Stack>

            <Stack direction='column' flexGrow='1' alignItems='stretch'>
                <Stack display='flex' flexDirection='row' alignItems='center'>

                    <Typography variant='h3' align='left' color='white' margin='1rem 0 1rem 0'>
                            Main Configurations 
                    </Typography>

                    <Button variant='contained'
                        color='inherit' 
                        onClick={this.handleLogoutSubmission}
                        sx={{
                            marginLeft: '50rem'
                        }}>
                        LOGOUT
                    </Button>

                </Stack>

                <Card className='MainCard' sx={{borderRadius:"1rem 0 0 0",backgroundColor:"#eee"}}>
                    <CardContent>
                        <Stack spacing='3rem' direction='column'>
                            <Stack direction='row' spacing='3rem'>
                                <CollectorCard/>
                                <DataSourceCard/>
                            </Stack>
                        <DataPointCard/>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
            </div>
        );
        return(jsx_component);
    };

    componentDidMount() {
        this.props.onGetDataSource(this.props.global.backend_instance)
        this.props.onGetDataPoint(this.props.global.backend_instance)
        this.props.onGetProtocols(this.props.global.backend_instance)
    };

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    auth: state.auth,
    global: state.global,
    popups: state.popups,
    datapoint: state.datapoint,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onLogoutSubmit: ()=>dispatch(authActions.logout()),
    onTokenInvalid: ()=>dispatch(globalActions.clearAuthToken()),
    onCheckToken: (api_instance)=>dispatch(authActions.validate(api_instance)),
    onVerify: (status)=>dispatch(popupsActions.openVerifyPopup(status)),
    onUpdateDataPending: ()=>dispatch(datapointActions.updateDataPending()),
    onGetDataPoint:(api)=>dispatch(datapointActions.getData(api)),
    onGetDataSource:(api)=>dispatch(datasourceActions.getData(api)),
    onGetProtocols:(api)=>dispatch(datasourceActions.getAvailProtocols(api))
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Main);