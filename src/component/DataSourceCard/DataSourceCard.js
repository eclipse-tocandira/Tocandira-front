/** This module holds the view of the React
 * component `DataSourceCard`
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
import {TableRow, Checkbox} from '@mui/material'
// Local Imports
import TitledCard from '../TitledCard/TitledCard';
import DataTable from '../DataTable/DataTable';
import TextCell from '../DataTable/TextCell';
import CheckCell from '../DataTable/CheckCell';
import DataSourcePopup from '../../component/Popups/DataSourcePopup'
import DeletePopup from '../../component/Popups/DeletePopup';
import * as popupsActions from '../../store/popups/actions'
import * as datasourceActions from '../../store/datasource/actions'

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataSourceCard extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        onOpenPopup: PropTypes.func,
        onGetDataSource: PropTypes.func,
        onDeleteDataSource: PropTypes.func,
        global: PropTypes.object,
        popups: PropTypes.object,
        datasource: PropTypes.object,
    };

    /** Defines the component state variables */
    state = {
        popup_action:'new',
        selected_row:{name:null,id:-1},
        delete_content:{title:"",msg:""},
        open_delete:false
    }

    /** Description.
    * @param ``: */
     handleRowClick=(name,index) => {
        const newState = {...this.state};
        if (name===this.state.selected_row.name){
            newState.selected_row = {name:null,id:-1};
        } else {
            newState.selected_row = {name:name,id:index};
        }
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleNewClick=() => {
        const newState = {...this.state};
        newState.popup_action = 'new';
        this.setState(newState);
        this.props.onOpenPopup(true);
    }
    /** Description.
    * @param ``: */
    handleEditClick=() => {
        const newState = {...this.state};
        newState.popup_action = 'edit';
        this.setState(newState);
        this.props.onOpenPopup(true);
    }
    handleDeleteCancel=() => {
        const newState = {...this.state};
        newState.open_delete = false;
        this.setState(newState);
    }
    handleDeleteProceed=() => {
        this.props.onDeleteDataSource(this.props.global.backend_instance,this.state.selected_row.name);
        const newState = {...this.state};
        newState.open_delete = false;
        newState.selected_row = {name:null,id:-1};
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleDeleteClick=() => {
        const delete_title = 'Delete "'+this.state.selected_row.name+'"  Data Source?';
        const delete_msg = 'Are you sure to delete the Data Source "'+
            this.state.selected_row.name+'" ? This action is permanent and can not be undone.';
        
        const newState = {...this.state};
        newState.delete_content = {title:delete_title,msg:delete_msg};
        newState.open_delete = true;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handlePopUpLeave=() => {
        this.props.onOpenPopup(false);
    }

    /** Description.
    * @param ``: 
    * @returns */
    buildContentRow=(row, index) => {
        const is_selected = row.name===this.state.selected_row.name;
        const content = <TableRow hover
            onClick={this.handleRowClick.bind(this,row.name,index)}
            role="checkbox"
            tabIndex={-1}
            key={index}
            selected={is_selected} >
                <CheckCell check_component={<Checkbox color="primary" checked={is_selected}/>}/>
                {[row.name, row.plc_ip, row.protocol.name].map(
                    (text, index) => <TextCell text={text} key={index}/>
                )}
        </TableRow>
        return(content);
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){

        const delete_popup = <DeletePopup open={this.state.open_delete}
            content={this.state.delete_content}
            nameOk={"DELETE"} nameCancel={"CANCEL"}
            onOkClick={this.handleDeleteProceed}
            onCancelClick={this.handleDeleteCancel}/>

        let popup = null;
        if (this.props.popups.open_ds) {
            // Hack: Seems redundant but this IF is needed
            //       to reset the DataSourcePopup component
            //       at each open. Making state management easier.
            popup = <DataSourcePopup 
                open={this.props.popups.open_ds}
                is_new={this.state.popup_action==='new'}
                selected_row={this.state.selected_row}
                onClose={this.handlePopUpLeave}/>
        }
        const card_contents=[
            <DataTable key='0'
                headers={["Name","IP Address","Protocol"]}
                ncols_to_actions={2}
                content_rows={this.props.datasource.ds_content.filter(row=>row.active)}
                selected_row={this.state.selected_row}
                buildContentRow={this.buildContentRow}
                onRowClick={this.handleRowClick}
                onNewClick={this.handleNewClick}
                onEditClick={this.handleEditClick}
                onDeleteClick={this.handleDeleteClick}/>,
            popup,
            delete_popup
            ]; 

        const jsx_component = (
            <TitledCard cardprops={{flex:'1 1 auto'}}
                title='Data Sources' contents={card_contents}/>
        );
        return(jsx_component);
    }
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    popups: state.popups,
    datasource: state.datasource
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onOpenPopup:(open)=>dispatch(popupsActions.openDataSourcePopup(open)),
    onGetDataSource:(api)=>dispatch(datasourceActions.getData(api)),
    onDeleteDataSource:(api,ds_name)=>dispatch(datasourceActions.deleteData(api,ds_name)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(DataSourceCard);