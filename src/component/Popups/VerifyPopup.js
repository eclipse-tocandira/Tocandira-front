/** This module holds the view of the React
 * component `VerifyPopup`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
 * - react-redux 
*/
// Imports from modules;
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Stack, TableRow, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CancelIcon from '@mui/icons-material/Cancel';

// Local Imports
import FormPopup from  './FormPopup';
import DataTable from '../DataTable/DataTable';
import * as datapointActions from '../../store/datapoint/actions';
import * as datasourcetActions from '../../store/datasource/actions';
import TextCell from '../DataTable/TextCell';

//import './DataSourcePopup.css';
// #######################################

/** Class that checks if the created data points are valid
* @property `props.`:
* @method `props.`: */
class VerifyPopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        open: PropTypes.bool,
        global: PropTypes.object,
        datapoint: PropTypes.object,
        datasource: PropTypes.object,
        onClose: PropTypes.func,
        onPostDataPointVerify: PropTypes.func,
        onPutDataPointConfirm: PropTypes.func,
        onPutDataSourceConfirm: PropTypes.func,
    };
    /** Defines the component state variables */
    state = {
    };
    // /** Context Definition*/
    // static contextType ;

    /** Changes the pending status to true of the new data points and their data sources.*/
    handleSaveClick=() => {
        const status_true = this.props.datapoint.dp_verify.filter((el) => el.status );
        const row_dp = status_true.map(
            row => this.props.datapoint.dp_content.find(ele=>ele.name===row.name)
        )
        const row_ds = row_dp.map(
            row => row.datasource_name
        )
        const row_ds_without_repeat = [...new Set(row_ds)];
        this.props.onPutDataSourceConfirm(this.props.global.backend_instance, row_ds_without_repeat);
        this.props.onPutDataPointConfirm(this.props.global.backend_instance, status_true);
        this.handleCancelClick();
    };

    /** Close card VerifyPopup.*/
    handleCancelClick=() => {
        this.props.onClose();
    };

    /** Card line values VerifyPopup.
    * @param `row`: Date point for verification
    * @returns `content`: Line containing the name, address, 
    * an icon representing the status and response of a Data Source */
    buildContentRow=(row, index) => {
        let response = null
        let icon = null

        if (row.status === null){
            icon = <MoreHorizIcon />
        } else if (row.status === true) {
            icon = <CheckCircleIcon color='success' />
            response = row.response
        } else {
            icon = <Tooltip title={row.message} disableInteractive placement="right">
                <CancelIcon color='error' />
            </Tooltip>
        }

        const content = (
        <TableRow tabIndex={-1} key={index} >
            {[row.name, row.address, icon, response].map(
                (text, index) => <TextCell text={text} key={index}/>
            )}
        </TableRow>
        )
        return(content);
    };

    /** Communicates with the backend to verify the Data Point.*/
    handleCheckClick=() => {
        this.props.datapoint.dp_verify.map(row => 
            this.props.onPostDataPointVerify(this.props.global.backend_instance, row.name)
        )
    };
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <FormPopup
                open={this.props.open}
                title="Verify Data Points"
                nameOk="SAVE" nameCancel="CANCEL"
                onOkClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}>
                <Stack direction="column" spacing='1rem' flexGrow='1' alignItems="stretch">
                    <Button
                        variant='contained'
                        onClick={this.handleCheckClick}
                        color='primary'
                        size='medium'
                        fullWidth={true}
                    >
                        CHECK
                    </Button>

                    <DataTable
                        headers={["Name","Address","Status","Response"]}
                        with_checkbox={false}
                        content_rows={this.props.datapoint.dp_verify}
                        selected_row={this.state.selected_row}
                        buildContentRow={this.buildContentRow}
                        with_action_items={false}
                        with_pagination={false}
                    />
                </Stack>
            </FormPopup>
        );
        return(jsx_component);
    }

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    datapoint: state.datapoint,
    datasource: state.datasource,
    collector: state.collector,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onPostDataPointVerify:(api, dp_name)=>dispatch(datapointActions.postDataVerify(api, dp_name)),
    onPutDataPointConfirm:(api, dp_list)=>dispatch(datapointActions.putDataPointConfirm(api, dp_list)),
    onPutDataSourceConfirm:(api, ds_list)=>dispatch(datasourcetActions.putDataSourceConfirm(api, ds_list)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(VerifyPopup);