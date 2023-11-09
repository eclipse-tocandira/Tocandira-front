/** This module holds the view of the React
 * component `Frame`
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
import { Navigate } from 'react-router';
import { Stack, Button, Card, CardContent, Typography, Badge, IconButton, Tooltip } from '@mui/material';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
// Local Imports
import './Frame.css';
import DynamicTypography from '../DynamicTypography/DynamicTypography'
import * as authActions from '../../store/auth/actions';
import * as globalActions from '../../store/global/actions';
import * as popupsActions from '../../store/popups/actions';
import * as datapointActions from '../../store/datapoint/actions';
import * as collectorActions from '../../store/collector/actions';
import * as routeNames from '../../routeNames';
// #######################################

/** The main frame of the application
* @property `props.auth`: Redux access to auth store.
* @property `props.global`: Redux access to global store.
* @method `props.onLogoutSubmit`: Redux function for auth stote `logout` action.*/
class Frame extends React.PureComponent {

    /** Defines the component property types */
    static propTypes = {
        title: PropTypes.string,
        back: PropTypes.bool,
        auth: PropTypes.object,
        global: PropTypes.object,
        actions: PropTypes.bool,
        popups: PropTypes.object,
        datapoint: PropTypes.object,
        onLogoutSubmit: PropTypes.func,
        onTokenInvalid: PropTypes.func,
        onVerify: PropTypes.func,
        onUpload: PropTypes.func,
        onUpdateDataPending: PropTypes.func,
    }
    /** Defines the component state variables */
    state = {
        redirect: null,
    }
    /** Description.
    * @param ``: 
    * @returns */
    handleBack=() => {
        this.props.onSelectCollector(null);
        const newState = {...this.state};
        newState.redirect = <Navigate to={routeNames.MAIN}/>;
        this.setState(newState);
    }

    /** Description.
    * @param ``: */
    handleLogoutSubmission=() => {
        this.props.onTokenInvalid();
        this.props.onLogoutSubmit();
    }
    /** Description.
    * @param ``: 
    * @returns */
    handleClickUpload=() => {
        this.props.onUpload(true);
    }
    /** Description.
    * @param ``: */
    handleClickVerify=() => {
        this.props.onUpdateDataPending(this.props.datapoint.dp_content.filter(this.filterDataPending));
        this.props.onVerify(true);
    }

    /** Description.
    * @param ``: 
    * @returns */
    filterData=(row) => {
        const ds_name = row.datasource_name;
        const ds = this.props.datasource.ds_content.filter(row=>row.name===ds_name)[0];
        if (ds) {
            return(row.active && ds.collector_id===this.props.collector.selected.id)
        } else {
            return(false)
        }
    }

    /** Description.
    * @param ``: 
    * @returns */
    filterDataPending=(row) => {
        return(row.pending && this.filterData(row))
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const dp_list = this.props.datapoint.dp_content.filter(this.filterData);
        const dp_pending_num = dp_list.filter(row=>row.pending).length;
        let actions = [];
        let back = <DynamicTypography variant='h3'>&nbsp;</DynamicTypography>

        if (this.props.back) {
            back = <Tooltip title="Back" followCursor disableInteractive placement="top">
                <IconButton variant="contained" size="large" onClick={this.handleBack}>
                    <FirstPageRoundedIcon htmlColor='#eee' fontSize="inherit"/>
                </IconButton>
            </Tooltip>
        }

        if (this.props.actions) {
            actions = [<Badge color='warning' badgeContent={dp_pending_num} key={1}>
                <Button variant='contained' fullWidth
                    size='large' color='success' onClick={this.handleClickVerify}>
                    VERIFY
                </Button>
                </Badge>,
                <Button variant='contained' fullWidth key={2}
                    size='large' color='primary' onClick={this.handleClickUpload}>
                    UPLOAD
                </Button>
            ]
        }

        const jsx_component = (
            <div className='Frame'>
                {this.state.redirect}
                <Stack  direction='column' justifyContent='space-between' marginX={'0.5rem'}>
                    <Stack direction='column' spacing='2rem' marginTop='1.2rem'>
                        {back}
                        {actions.map(ele=>ele)}
                    </Stack>
                    <Button variant='contained' sx={{ marginBottom:'1rem'}} fullWidth
                        size='large' color='inherit' onClick={this.handleLogoutSubmission}>
                        LOGOUT
                    </Button>
                </Stack>

            <Stack direction='column' flexGrow='1' alignItems='stretch'>
                <Typography variant='h3' align='left' color='white' margin='1rem 0 1rem 0'>
                        {this.props.title}
                </Typography>

                <Card className='MainCard' sx={{borderRadius:"1rem 0 0 0",backgroundColor:"#eee"}}>
                    <CardContent>
                        {this.props.children}
                    </CardContent>
                </Card>
            </Stack>
            </div>
        );
        return(jsx_component);
    }

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    datapoint: state.datapoint,
    datasource: state.datasource,
    collector: state.collector,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onLogoutSubmit: ()=>dispatch(authActions.logout()),
    onTokenInvalid: ()=>dispatch(globalActions.clearAuthToken()),
    onVerify: (status)=>dispatch(popupsActions.openVerifyPopup(status)),
    onUpload: (status)=>dispatch(popupsActions.openUploadPopup(status)),
    onUpdateDataPending: (dp_list)=>dispatch(datapointActions.updateDataPending(dp_list)),
    onSelectCollector: (id)=>dispatch(collectorActions.selectCollector(id)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Frame);