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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dialog, DialogContentText, DialogTitle, DialogActions,
    Button, DialogContent } from '@mui/material';
// Local Imports
import DataTable from '../DataTable/DataTable';
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

    /** Description.
    * @param ``: 
    * @returns */
    handleOkClick=() => {
        this.props.onUpload(this.props.global.backend_instance,this.props.collector.selected.id);
        this.handleCancelClick();
    }

    /** Description.
        * @param ``:
        * @returns */
    filterData=(row) => {
        const ds_name = row.datasource_name
        const ds = this.props.datasource.ds_content.filter(row=>row.name===ds_name)[0]
        if (ds) {
            return(row.active && !row.pending && ds.collector_id===this.props.collector.selected.id)
        } else {
            return(false)
        }
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

        const header = [
            {field: 'name',headerName:"Name",flex:0.5},
            {field: 'datasource_name',headerName:"Data Souce",flex:0.5},
            {field: 'address',headerName:"Address",flex:0.5,filterable:false, sortable:false, valueGetter: (params) => getDataPointAddress(params.row,params.row.access.name)},
        ];

        const show_rows = this.props.datapoint.dp_content.filter(this.filterData)
        let message = "You are about to upload the following DataPoints to be accessed. Are you sure ?"
        if (show_rows.length===0){
            message = "You are about to do an empty upload. This will stop all data collections in this collector. Are you sure?"
        }
        const jsx_component = (
            <Dialog open={this.props.open} scroll='paper'>
                <DialogTitle variant='h5' align='left' color='text.secondary'>
                    Add these DataPoins ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                    <DataTable row_height={35} header_height={40}
                        headers={header}
                        content_rows={show_rows}
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
    datasource: state.datasource,
    collector: state.collector,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onUpload: (api,id)=>dispatch(datapointActions.exportData(api,id))
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(UploadPopup);