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
import { Stack } from '@mui/material';
// Local Imports
import * as authActions from '../../store/auth/actions';
import * as datapointActions from '../../store/datapoint/actions';
import * as datasourceActions from '../../store/datasource/actions';
import * as popupsActions from '../../store/popups/actions';
import DataSourceCard from '../../component/DataSourceCard/DataSourceCard';
import DataPointCard from '../../component/DataPointCard/DataPointCard';
import VerifyPopup from '../../component/Popups/VerifyPopup';
import UploadPopup from '../../component/Popups/UploadPopup';
import Frame from '../../component/Frame/Frame';

// #######################################

/** The main page of the application
* @property `props.auth`: Redux access to auth store.
* @property `props.global`: Redux access to global store.*/
class Main extends React.PureComponent {

    /** Defines the component property types */
    static propTypes = {
        global: PropTypes.object,
        popups: PropTypes.object,
        onCheckToken: PropTypes.func
    }
    /** Defines the component state variables */
    state = {
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

        // NOTE: The onClick event in Main <div> will be executed
        //       after any Click on configuration screen by "bubbling",
        //       this is the easiest way to perform a continuous token
        //       check and logout the user when it becomes invalid.
        const jsx_component = (
            <div onClick={this.props.onCheckToken.bind(this,this.props.global.backend_instance)}>
                <VerifyPopup open={this.props.popups.open_verify} onClose={this.handlePopUpLeave}/>
                <UploadPopup open={this.props.popups.open_upload} onClose={this.handlePopUpLeave}/>
                <Frame actions={true} back={true} title={this.props.collector.selected.name}>
                    <Stack spacing='3rem' direction='column'>
                        <DataSourceCard/>
                        <DataPointCard/>
                    </Stack>
                </Frame>
            </div>
        );
        return(jsx_component);
    }

    componentDidMount() {
        this.props.onGetDataSource(this.props.global.backend_instance);
        this.props.onGetDataPoint(this.props.global.backend_instance);
        this.props.onGetProtocols(this.props.global.backend_instance);
    }

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    popups: state.popups,
    collector: state.collector,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onCheckToken: (api)=>dispatch(authActions.validate(api)),
    onVerify: (status)=>dispatch(popupsActions.openVerifyPopup(status)),
    onUpload: (status)=>dispatch(popupsActions.openUploadPopup(status)),
    onGetDataPoint:(api)=>dispatch(datapointActions.getData(api)),
    onGetDataSource:(api)=>dispatch(datasourceActions.getData(api)),
    onGetProtocols:(api)=>dispatch(datasourceActions.getAvailProtocols(api)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Main);