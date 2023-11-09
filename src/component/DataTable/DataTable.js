/** This module holds the view of the React
 * component `DataTable`
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
import { Box } from '@mui/material'
import { DataGrid, gridClasses } from '@mui/x-data-grid';
// Local Imports
import CardActionItems from '../CardActionItems/CardActionItems'

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataTable extends React.PureComponent {
     
    /** Defines the component property types */
    static propTypes = {
        sx: PropTypes.object,
        show_empty: PropTypes.bool,
        headers:PropTypes.any,
        header_height:PropTypes.number,
        row_height:PropTypes.number,
        content_rows:PropTypes.array,
        selected_row:PropTypes.object,
        with_checkbox: PropTypes.bool,
        with_action_items: PropTypes.bool,
        with_pagination: PropTypes.bool,
        onRowClick:PropTypes.func,
        onNewClick:PropTypes.func,
        onEditClick:PropTypes.func,
        onDeleteClick:PropTypes.func
    };

    static defaultProps={
        show_empty: false,
        with_checkbox: true,
        with_action_items: true,
        with_pagination: true,
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleSingleRowSelection=(params) => {
        params.splice(0,params.length)
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        
        const remove_ugly_features = {
            // This settings removes the ugly outline when selecting the table.
            // Source: https://github.com/mui/mui-x/issues/2429#issuecomment-1241756853
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {outline: "none"},
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {outline: "none"},
            // This settings removes the checkbox that allows to select all items.
            // Source: https://stackoverflow.com/a/74195359
            [`& .${gridClasses.columnHeader}Checkbox .${gridClasses.columnHeader}TitleContainer`]: {display: "none"}
        }

        let action_items = null;
        if (this.props.with_action_items) {
            action_items = <Box position='absolute' bottom='0.7rem' left='0.5rem'> 
                <CardActionItems
                enable_del_edit={this.props.selected_row.name===null}
                onNewClick={this.props.onNewClick}
                onEditClick={this.props.onEditClick}
                onDeleteClick={this.props.onDeleteClick}/>
            </Box>;
        }

        const n_items = this.props.content_rows.length;
        
        const page_props = {
            size: 3,
            options: [3, 6, 9, 12]
        }

        if (!this.props.with_pagination){
            page_props.size = n_items+1
            page_props.options = null
        }
        
        let table = null
        if (n_items>0 | this.props.show_empty) {
            table = <DataGrid sx={{...remove_ugly_features, ...this.props.sx}}
                rowHeight={this.props.row_height}
                columnHeaderHeight={this.props.header_height}
                columns={this.props.headers}
                initialState={{pagination:{paginationModel:{pageSize:page_props.size}}}}
                hideFooterPagination={!this.props.with_pagination}
                checkboxSelection={this.props.with_checkbox}
                pageSizeOptions={page_props.options}
                getRowId={(row) => row.name}
                rows={this.props.content_rows}
                hideFooterSelectedRowCount={true}
                hideFooter={!this.props.with_pagination && !this.props.with_action_items}
                onCellClick={this.props.onRowClick}
                disableRowSelectionOnClick
                disableColumnSelector
                onRowSelectionModelChange={this.handleSingleRowSelection}/>
        }

        const jsx_component = (
            <Box position='relative' minHeight='3rem'>
                {table}
                {action_items}
            </Box>
        );
        return(jsx_component);
    }
    
}

// Make this component visible on import
export default DataTable;