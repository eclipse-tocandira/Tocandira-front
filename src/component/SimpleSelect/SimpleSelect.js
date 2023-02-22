/** This module holds the view of the React
 * component `SimpleSelect`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, FormControl, InputLabel, Select } from '@mui/material';
// Local Imports
//import './SimpleSelect.css';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class SimpleSelect extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        label:PropTypes.string,
        list:PropTypes.arrayOf(PropTypes.string),
        value:PropTypes.string,
        place_holder:PropTypes.string,
        defaultValue:PropTypes.string,
        onChange:PropTypes.func,
    };

    /** Description.
    * @param ``: 
    * @returns */
    buildMenu=(ele,index)=><MenuItem value={ele} key={index}>{ele}</MenuItem>
    
    /** Description.
    * @param ``: 
    * @returns */
    handlePlaceHolder=(selected) => {
        let value;
        if (selected === null || selected === ""){
            value = <em>{this.props.place_holder}</em>;
        } else {
            value = selected;
        }
        return(value);
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const std_name = this.props.label.replace(/\s/g, '');
        const id = std_name+"-simple-select-label"

        const jsx_component = (
            <FormControl fullWidth>
                <InputLabel shrink={true} id={id}>{this.props.label}</InputLabel>
                <Select
                    displayEmpty
                    labelId={id} label={this.props.label} notched={true}
                    defaultValue={this.props.defaultValue}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    renderValue={this.handlePlaceHolder}>
                {this.props.list.map(this.buildMenu)} 
                </Select>
            </FormControl>
        );
        return(jsx_component);
    }
    
}

// Make this component visible on import
export default SimpleSelect;