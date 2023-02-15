/** This module holds the view of the React
 * component `DataPointCard`
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
import { connect } from 'react-redux'
import {TableRow, Checkbox} from '@mui/material'
// Local Imports
import TitledCard from '../TitledCard/TitledCard';
import DataTable from '../DataTable/DataTable';
import TextCell from '../DataTable/TextCell';
import CheckCell from '../DataTable/CheckCell';
import { getDataPointAddress } from '../Protocols/Protocols';
import * as popupsActions from '../../store/popups/actions';
import * as datapointActions from '../../store/datapoint/actions';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataPointCard extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
    };
    
    /** Defines the component state variables */
    state = {
        selected_row:{name:null,id:-1}
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
        this.props.onOpenPopup(true);
        const newState = {...this.state};
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleEditClick=() => {
        const newState = {...this.state};
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleDeleteClick=() => {
        const newState = {...this.state};
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handlePopUpLeave=() => {
        this.props.onGetDataPoint(this.props.global.backend_instance);
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
                {[row.name, row.description, getDataPointAddress(row,row.access.name), row.datasource_name].map(
                    (text, index) => <TextCell text={text} key={index}/>
                )}
        </TableRow>
        return(content);
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        // console.info(this.props.datapoint.dp_content)
        const card_contents=[
            <DataTable
                headers={["Name","Description","Address","Data Souce"]}
                ncols_to_actions={2}
                content_rows={this.props.datapoint.dp_content}
                selected_row={this.state.selected_row}
                buildContentRow={this.buildContentRow}
                onRowClick={this.handleRowClick}
                onNewClick={this.handleNewClick}
                onEditClick={this.handleEditClick}
                onDeleteClick={this.handleDeleteClick}/>,
            ];

        const jsx_component = (
            <TitledCard cardprops={{flex:'1 1 auto'}}
                title='Data Points' contents={card_contents}/>
        );
        return(jsx_component);
    };

    componentDidMount() {
        this.props.onGetDataPoint(this.props.global.backend_instance)
    };
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    popups: state.popups,
    datapoint: state.datapoint
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onOpenPopup:(open)=>dispatch(popupsActions.openDataPointPopup(open)),
    onGetDataPoint:(api)=>dispatch(datapointActions.getData(api)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(DataPointCard);