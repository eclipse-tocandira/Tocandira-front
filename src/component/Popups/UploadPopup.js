/** This module holds the view of the React
 * component `UploadPopup`
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
import DataTable from '../DataTable/DataTable';
import { Dialog, DialogContentText, DialogTitle, DialogActions,
    Button, DialogContent, TableRow } from '@mui/material';

// Local Imports
import TextCell from '../DataTable/TextCell';
import * as datapointActions from '../../store/datapoint/actions';
import { getDataPointAddress } from '../Protocols/Protocols';
// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class UploadPopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        open: PropTypes.bool,
        global: PropTypes.object,
        datapoint: PropTypes.object,
        onClose: PropTypes.func,
        onUpload: PropTypes.func,
    };
    /** Defines the component state variables */
    state = {
    };
    // /** Context Definition*/
    // static contextType ;
    

    /** Card line values VerifyPopup.
    * @param `row`: Date point for verification
    * @returns `content`: Line containing the name, address, 
    * an icon representing the status and response of a Data Source */
    buildContentRow=(row, index) => {
        const content = (
        <TableRow tabIndex={-1} key={index}>
            {[row.name, row.datasource_name, getDataPointAddress(row,row.access.name)].map(
                (text, index) => <TextCell text={text} key={index}/>
            )}
        </TableRow>
        )
        return(content);
    };

    /** Description.
    * @param ``: 
    * @returns */
    handleOkClick=() => {
        this.props.onUpload(this.props.global.backend_instance);
        this.handleCancelClick();
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleCancelClick=() => {
        this.props.onClose();
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const show_rows = this.props.datapoint.dp_content.filter(row=>row.active && !row.pending)
        const jsx_component = (
            <Dialog open={this.props.open} scroll='paper'>
                <DialogTitle variant='h5' align='left' color='text.secondary'>
                    Add these DataPoins ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You are about to upload the following DataPoints to be accessed. Are you sure ?
                    </DialogContentText>
                    <DataTable
                        headers={["Name","DataSource","Address"]}
                        content_rows={show_rows}
                        buildContentRow={this.buildContentRow}
                        with_checkbox={false}
                        with_action_items={false}
                        with_pagination={false}/>
                </DialogContent>
                <DialogActions>
                    <Button variant='text' size='medium' color='primary'
                        onClick={this.handleOkClick}>
                        UPLOAD
                    </Button>
                    <Button variant='text' size='medium' color='inherit'
                        onClick={this.handleCancelClick}>
                        CANCEL
                    </Button>
                </DialogActions>
            </Dialog>
        );
        return(jsx_component);
    }
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    datapoint: state.datapoint,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onUpload: (api)=>dispatch(datapointActions.exportData(api))
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(UploadPopup);