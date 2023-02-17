/** This module holds the view of the React
 * component `DataPointPopup`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import {Collapse, Stack } from '@mui/material'

// Local Imports
import FormPopup from  './FormPopup'
import {ImplementedProtocols} from '../Protocols/Protocols'
import SimpleSelect from '../SimpleSelect/SimpleSelect';
//import './DataPointPopup.css';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataPointPopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
    };
    /** Defines the component state variables */
    state = {
        ds_selected:"",
        protocol_info:{
            Siemens:{
                events:{},
                values:{ name: "", description: "", num_type: "REAL", datasource_name: "", access: {
                    name: "Siemens",data: {
                      address: ""}}},
                defaults:{ name: "Variable name", description: "Variable description", num_type: {
                    defaultValue: "REAL",menuItems: ["BOOL","INT","DINT","REAL"]}, datasource_name: "PLC name", access: {
                    name: "Siemens",data: {
                      address: "DB100.DBD818"}}}
            },
            Rockwell:{
                events:{},
                values:{ name: "", description: "", num_type: "REAL", datasource_name: "", access: {
                    name: "Rockwell", data: {
                      tag_name: "FIX_ANALOG[32]" }}},
                defaults:{ name: "Variable name", description: "Variable description", num_type: {
                    defaultValue: "REAL",menuItems: ["BOOL","INT","DINT","REAL"]}, datasource_name: "PLC name", access: {
                        name: "Rockwell", data: {
                            tag_name: "FIX_ANALOG[32]" }}}
            },
            Modbus:{
                events:{},
                values:{ name: "", description: "", num_type: "REAL", datasource_name: "PLC name", access: {
                    name: "Modbus", data: {
                      address: "", func_code: "4 - HOLDING REGISTER"}}},
                defaults:{ name: "Variable name", description: "Variable description", num_type: {
                    defaultValue: "REAL",menuItems: ["BOOL","INT","DINT","REAL"]}, datasource_name: "PLC name", access: {
                    name: "Modbus", data: {
                      address: "32004", func_code: {
                        defaultValue: "4 - HOLDING REGISTER", menuItems: ["0 - COIL","1 - STATUS","3 - INPUT REGISTER","4 - HOLDING REGISTER"]}}}}
            }
        }
    };
    
    /** Description.
    * @param ``: 
    * @returns */
    handleSaveClick=() => {
        this.handleCancelClick()
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleCancelClick=() => {
        const newState = {...this.state};
        newState.ds_selected = "";
        this.setState(newState);
        this.props.onCancelClick()
    }
    
    /** Description.
    * @param ``: 
    * @returns */
    handleDataSourceChange=(event) => {
        const newState = {...this.state};
        newState.ds_selected = event.target.value;
        this.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleAnimations=(check)=>{
        let delay_value;
        let timeout_value;
        if (check) {
            delay_value='400ms';
            timeout_value=700;
        } else {
            delay_value='0ms';
            timeout_value=300;
        }
        const props = {
            delay:{transitionDelay: delay_value},
            timeout:timeout_value
        };

        return(props);
    }

    /** Description.
    * @param ``: 
    * @returns */
    buildContents=(content, index) => {
        let element = null;
        const dsrow = this.props.datasource.ds_content.find(ele=>ele.name===this.state.ds_selected)
        if (dsrow){
            const check = dsrow.protocol.name === content.name;
            const prop = this.handleAnimations(check);
            element = <Collapse timeout={prop.timeout} key={index} in={check} style={prop.delay} unmountOnExit>
                {content.fields}
            </Collapse>
        }
        return(element);
    }

    /** Description.
    * @param ``: 
    * @returns */
    buildSpecificProtocolFields=(ele) =>{
        const args = this.state.protocol_info[ele.name]
        return({name:ele.name, fields:ele.class.dataPointFields(args.events,args.values,args.defaults)})
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */ 
    render(){
        const content_array = ImplementedProtocols.map(this.buildSpecificProtocolFields);
        const ds_select_options = this.props.datasource.ds_content.map(element => element.name);
        const specific_elements = content_array.map(this.buildContents);
        
        const jsx_component = (
            <FormPopup
                open={this.props.open}
                title="New DataPoint"
                nameOk="SAVE" nameCancel="CANCEL"
                onOkClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}>
                <Stack direction="column" spacing='1rem' flexGrow='1' alignItems="stretch">
                    <SimpleSelect
                        label={"DataSource"}
                        default_value={""}
                        list={ds_select_options}
                        value={this.state.ds_selected}
                        onChange={this.handleDataSourceChange}/>
                    {specific_elements}
                </Stack>
            </FormPopup>
        );
        return(jsx_component);
    };
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    datasource: state.datasource,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
});
// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(DataPointPopup);