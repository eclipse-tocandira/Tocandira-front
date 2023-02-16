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
// import PropTypes from 'prop-types';
import { Button, Stack, TableCell, TableRow } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CancelIcon from '@mui/icons-material/Cancel';

// Local Imports
import FormPopup from  './FormPopup';
import DataTable from '../DataTable/DataTable';
import * as popupsActions from '../../store/popups/actions';
import * as datapointActions from '../../store/datapoint/actions';
import TextCell from '../DataTable/TextCell';
import { getDataPointAddress } from '../Protocols/Protocols';
// import {ImplementedProtocols} from '../Protocols/Protocols';

//import './DataSourcePopup.css';
// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class VerifyPopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
    };
    /** Defines the component state variables */
    state = {
        content_rows: [
           {"name" : "name1",  "address" : "address1",  "status" :  true,  "response": '1'},
           {"name" : "name2",  "address" : "address2",  "status" :  false,  "response": '2'},
           {"name" : "name3",  "address" : "address3",  "status" :  false,  "response": '3'},
        ],
        selected_row:{name:null,id:-1},
    };
    // /** Context Definition*/
    // static contextType ;

    /** Description.
    * @param ``: 
    * @returns */
    handleSaveClick=() => {
        this.handleCancelClick();
    };

    /** Description.
    * @param ``: 
    * @returns */
    handleCancelClick=() => {
        this.props.onVerify(false);
    };

    /** Description.
    * @param ``: 
    * @returns */
     buildContentRow=(row, index) => {
        console.log("Valor de row", row);
        let response = '123456'
        let color = null

        if (row.status){
            color='success';
        } else {
            color='error';
        };

        const icon =  <CheckCircleIcon color={color} />

        const content = (
        <TableRow
            tabIndex={-1}
            key={index}
        >
            {[row.name, getDataPointAddress(row,row.access.name), icon, response].map(
                (text, index) => <TextCell text={text} key={index}/>
            )}
        </TableRow>
        )
        return(content);
    }
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <FormPopup
                open={this.props.popups.open_verify}
                title="Verify Data Points"
                nameOk="SAVE" nameCancel="CANCEL"
                onOkClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}>
                <Stack direction="column" spacing='1rem' flexGrow='1' alignItems="stretch">
                    <Button
                        variant='contained'
                        color='primary'
                        size='medium'
                        fullWidth={true}
                    >
                        CHECK
                    </Button>

                    <DataTable
                        headers={["Name","Address","Status","Response"]}
                        with_checkbox={false}
                        content_rows={this.props.datapoint.dp_content}
                        selected_row={this.state.selected_row}
                        buildContentRow={this.buildContentRow}
                        with_action_items={false}
                        with_pagination={false}
                    />
                </Stack>
            </FormPopup>
        );
        return(jsx_component);
    };
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    popups: state.popups,
    datapoint: state.datapoint
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onVerify: (status)=>dispatch(popupsActions.openVerifyPopup(status)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(VerifyPopup);