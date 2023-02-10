/** This module holds the view of the React
 * component `DataSourceCard`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
 * - @mui/material
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import {TableRow, Checkbox} from '@mui/material'
// Local Imports
import TitledCard from '../TitledCard/TitledCard';
import DataTable from '../DataTable/DataTable';
import TextCell from '../DataTable/TextCell';
import CheckCell from '../DataTable/CheckCell';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataSourceCard extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        content_rows:PropTypes.arrayOf(PropTypes.object),
        selected_row:PropTypes.object,
        onRowClick:PropTypes.func,
        onNewClick:PropTypes.func,
        onEditClick:PropTypes.func,
        onDeleteClick:PropTypes.func,
    };

    /** Description.
    * @param ``: 
    * @returns */
     buildContentRow=(row, index) => {
        const is_selected = row.name===this.props.selected_row.name;
        const content = <TableRow hover
            onClick={this.props.onRowClick.bind(this,row.name,index)}
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
        const card_contents=[
            <DataTable
                headers={["Name","IP Address","Protocol"]}
                ncols_to_actions={2}
                content_rows={this.props.content_rows}
                selected_row={this.props.selected_row}
                buildContentRow={this.buildContentRow}
                onRowClick={this.props.onRowClick}
                onNewClick={this.props.onNewClick}
                onEditClick={this.props.onEditClick}
                onDeleteClick={this.props.onDeleteClick}/>,
            ];

        const jsx_component = (
            <TitledCard cardprops={{flex:'1 1 auto'}}
                title='Data Sources' contents={card_contents}/>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default DataSourceCard;