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
// Local Imports
import {Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, TablePagination, TableFooter} from '@mui/material'
import CardActionItems from '../CardActionItems/CardActionItems'
import CheckCell from './CheckCell';
import TextCell from './TextCell';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataTable extends React.PureComponent {
     
    /** Defines the component state variables */
    state = {
        pagination:{
            page: 0,
            rows_per_page: 3,
        },
    };

    /** Defines the component property types */
    static propTypes = {
        headers:PropTypes.arrayOf(PropTypes.string),
        ncols_to_actions:PropTypes.number,
        content_rows:PropTypes.array,
        selected_row:PropTypes.object,
        with_checkbox: PropTypes.bool,
        with_action_items: PropTypes.bool,
        with_pagination: PropTypes.bool,
        onRowClick:PropTypes.func,
        onNewClick:PropTypes.func,
        onEditClick:PropTypes.func,
        onDeleteClick:PropTypes.func,
        buildContentRow:PropTypes.func
    };

    static defaultProps={
        with_checkbox: true,
        with_action_items: true,
        with_pagination: true,
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleChangePage=(event,nextpage) => {
        const newPagination = {...this.state.pagination};
        newPagination.page = nextpage;
        this.setState({pagination:newPagination});
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleChangeRowsPerPage=(event) => {
        const newPagination = {...this.state.pagination};
        newPagination.rows_per_page = event.target.value;
        this.setState({pagination:newPagination});
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){

        let show_rows=[];
        const st_pag = this.state.pagination;
        if(st_pag.rows_per_page<this.props.content_rows.length){
            const ini = st_pag.page*st_pag.rows_per_page;
            const end = (st_pag.page+1)*st_pag.rows_per_page;
            show_rows = this.props.content_rows.slice(ini, end);
        } else {
            show_rows = this.props.content_rows;
        }

        let action_items = null;
        if (this.props.with_action_items) {
            action_items = (
            <TableCell colSpan={this.props.ncols_to_actions}>
                <CardActionItems
                    enable_del_edit={this.props.selected_row.name===null}
                    onNewClick={this.props.onNewClick}
                    onEditClick={this.props.onEditClick}
                    onDeleteClick={this.props.onDeleteClick}/>
            </TableCell>
            );
        };

        let pagination = null;
        if (this.props.with_pagination) {
            pagination = (
            <TablePagination rowsPerPageOptions={[3, 6, 9, 12]}
                count={this.props.content_rows.length}
                rowsPerPage={this.state.pagination.rows_per_page}
                page={this.state.pagination.page}
                onPageChange={this.handleChangePage}
                onRowsPerPageChange={this.handleChangeRowsPerPage}
            />
            );
        };

        let checkbox = null;
        if (this.props.with_checkbox) {
            checkbox = <CheckCell/>
        };

        const jsx_component = (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow hover>
                        {checkbox}
                        {this.props.headers.map((text, index) => <TextCell text={text} key={index}/>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>{show_rows.map(this.props.buildContentRow)}</TableBody>
                    <TableFooter>
                        <TableRow>
                            {action_items}
                            {pagination}
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default DataTable;