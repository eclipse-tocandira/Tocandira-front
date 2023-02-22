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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Stack, Button, Card, CardContent, Typography, Badge } from '@mui/material';
// Local Imports
import './Main.css';
import * as authActions from '../../store/auth/actions';
import * as globalActions from '../../store/global/actions';
import * as popupsActions from '../../store/popups/actions';
import * as datapointActions from '../../store/datapoint/actions';
import * as datasourceActions from '../../store/datasource/actions';
import * as collectorActions from '../../store/collector/actions';
import CollectorCard from '../../component/CollectorCard/CollectorCard';
import DataSourceCard from '../../component/DataSourceCard/DataSourceCard';
import DataPointCard from '../../component/DataPointCard/DataPointCard';
import VerifyPopup from '../../component/Popups/VerifyPopup';
import UploadPopup from '../../component/Popups/UploadPopup';

// #######################################

/** The main page of the application
* @property `props.auth`: Redux access to auth store.
* @property `props.global`: Redux access to global store.
* @method `props.onLogoutSubmit`: Redux function for auth stote `logout` action.*/
class Main extends React.PureComponent {

    /** Defines the component property types */
    static propTypes = {
        auth: PropTypes.object,
        global: PropTypes.object,
        popups: PropTypes.object,
        datapoint: PropTypes.object,
        onLogoutSubmit: PropTypes.func,
        onTokenInvalid: PropTypes.func,
        onCheckToken: PropTypes.func,
        onVerify: PropTypes.func,
        onUpload: PropTypes.func,
        onUpdateDataPending: PropTypes.func,
        onGetDataPoint: PropTypes.func,
        onGetDataSource: PropTypes.func,
        onGetProtocols: PropTypes.func,
        onGetCollectorProps: PropTypes.func,
    }
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
    * @param ``: 
    * @returns */
    handleClickUpload=() => {
        this.props.onUpload(true)
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
        this.props.onUpload(false);
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const dp_list = this.props.datapoint.dp_content.filter(row=>row.active);
        const dp_pending_num = dp_list.filter(row=>row.pending).length;
        const dp_confirmed_num = dp_list.length-dp_pending_num;


        // NOTE: The onClick event in Main <div> will be executed
        //       after any Click on configuration screen by "bubbling",
        //       this is the easiest way to perform a continuous token
        //       check and logout the user when it becomes invalid.
        const jsx_component = (
            <div className='Main' onClick={this.props.onCheckToken.bind(this,this.props.global.backend_instance)}>
                <VerifyPopup open={this.props.popups.open_verify} onClose={this.handlePopUpLeave}/>
                <UploadPopup open={this.props.popups.open_upload} onClose={this.handlePopUpLeave}/>
            
                <Stack  direction='column' justifyContent='space-between' marginX={'0.5rem'}>
                    <Stack  direction='column' spacing='2rem' marginTop='3rem'>
                        <Typography variant='h3'>&nbsp;</Typography>
                        <Badge color='warning' badgeContent={dp_pending_num}>
                        <Button variant='contained' fullWidth
                            size='large' color='success' onClick={this.handleClickVerify}>
                            VERIFY
                        </Button>
                        </Badge>
                        <Button variant='contained' fullWidth disabled={dp_confirmed_num===0}
                            size='large' color='primary' onClick={this.handleClickUpload}>
                            UPLOAD
                        </Button>
                    </Stack>

                    <Button variant='contained' sx={{ marginBottom:'1rem'}} fullWidth
                        size='large' color='inherit' onClick={this.handleLogoutSubmission}>
                        LOGOUT
                    </Button>
                </Stack>

            <Stack direction='column' flexGrow='1' alignItems='stretch'>
                <Typography variant='h3' align='left' color='white' margin='1rem 0 1rem 0'>
                        Main Configurations 
                </Typography>

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
    }

    componentDidMount() {
        this.props.onGetDataSource(this.props.global.backend_instance)
        this.props.onGetDataPoint(this.props.global.backend_instance)
        this.props.onGetProtocols(this.props.global.backend_instance)
        this.props.onGetCollectorProps(this.props.global.backend_instance)
    }

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
    onUpload: (status)=>dispatch(popupsActions.openUploadPopup(status)),
    onUpdateDataPending: ()=>dispatch(datapointActions.updateDataPending()),
    onGetDataPoint:(api)=>dispatch(datapointActions.getData(api)),
    onGetDataSource:(api)=>dispatch(datasourceActions.getData(api)),
    onGetProtocols:(api)=>dispatch(datasourceActions.getAvailProtocols(api)),
    onGetCollectorProps:(api)=>{dispatch(collectorActions.getParams(api))},
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Main);