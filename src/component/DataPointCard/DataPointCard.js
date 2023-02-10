/** This module holds the view of the React
 * component `DataPointCard`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
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
class DataPointCard extends React.PureComponent {
    
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
    getProtocolAddress=(row, prot_name) => {
        let address;
        if (prot_name==="Rockwell"){
            address = row.access.data.tag_name;
        } else {
            address = row.access.data.address;
        }
        return(address)
    }

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
                {[row.name, row.description, this.getProtocolAddress(row,row.access.name), row.datasource_name].map(
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
                headers={["Name","Description","Address","Data Souce"]}
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
                title='Data Points' contents={card_contents}/>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default DataPointCard;