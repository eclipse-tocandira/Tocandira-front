/** This module holds the view of the React
 * component `DataSourcePopup`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import {Collapse, Stack } from '@mui/material'

// Local Imports
import FormPopup from  './FormPopup'
import {ImplementedProtocols} from '../Protocols/Protocols'
import SimpleSelect from '../SimpleSelect/SimpleSelect';
//import './DataSourcePopup.css';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataSourcePopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
    };
    /** Defines the component state variables */
    state = {
        protocol_selected:"",
        protocol_list:["Siemens","Rockwell","Modbus"],
        protocol_info:{
            Siemens:{
                events:{},
                values:{name:"Example111",ip:"0.0.0.0",port:502,rack:0,slot:1},
                defaults:{plc: { defaultValue:"S7-300", menuItems: ["S7-200","S7-300","S7-400","S7-1200","S7-1500"] }}
            },
            Rockwell:{
                events:{},
                values:{name:"Example222",ip:"1.1.1.1",port:44818,slot:1,path:"1,16,A,11"},
                defaults:{connection: { defaultValue:"Ethernet", menuItems: ["Ethernet","DH+"] }}
            },
            Modbus:{
                events:{},
                values:{name:"Example333",ip:"2.2.2.2",port:502,slave_id:1},
                defaults:{}
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
        newState.protocol_selected = "";
        this.setState(newState);
        this.props.onCancelClick()
    }
    
    /** Description.
    * @param ``: 
    * @returns */
    handleProtocolChange=(event) => {
        const newState = {...this.state};
        newState.protocol_selected = event.target.value;
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
        const check = this.state.protocol_selected === content.name;
        const prop = this.handleAnimations(check);
        let element = <Collapse timeout={prop.timeout} key={index} in={check} style={prop.delay} unmountOnExit>
            {content.fields}
        </Collapse>
        return(element);
    }

    /** Description.
    * @param ``: 
    * @returns */
    buildSpecificProtocolFields=(ele) =>{
        const args = this.state.protocol_info[ele.name]
        return({name:ele.name, fields:ele.class.dataSourceFields(args.events,args.values,args.defaults)})
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */ 
    render(){
        const content_array = ImplementedProtocols.map(this.buildSpecificProtocolFields)

        const jsx_component = (
            <FormPopup
                open={this.props.open}
                title="New Data Source"
                nameOk="SAVE" nameCancel="CANCEL"
                onOkClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}>
                <Stack direction="column" spacing='1rem' flexGrow='1' alignItems="stretch">
                    <SimpleSelect
                        label={"Protocol"}
                        default_value={""}
                        list={this.state.protocol_list}
                        value={this.state.protocol_selected}
                        onChange={this.handleProtocolChange}/>
                    {content_array.map(this.buildContents)}
                </Stack>
            </FormPopup>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default DataSourcePopup;