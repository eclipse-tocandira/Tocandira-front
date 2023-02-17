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
import { connect } from 'react-redux';
import {Collapse, Stack } from '@mui/material'

// Local Imports
import FormPopup from  './FormPopup'
import {ImplementedProtocols} from '../Protocols/Protocols'
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import * as datasourceActions from '../../store/datasource/actions'
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
        need_defaults_update:true,
        info_ds:{},
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
        const prot_name = event.target.value;
        const prot_defaults = this.props.datasource.ds_defaults[prot_name];
        const prot_class = ImplementedProtocols.find(ele=>ele.name===prot_name).class;
        const info = prot_class.parseDataSourceDefault2Values(prot_defaults);

        newState.protocol_selected = prot_name;
        newState.info_ds = {...this.state.info_ds};
        newState.info_ds[prot_name] = info;

        this.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleDefaultsChange=(status) => {
        const newState = {...this.state};
        newState.need_defaults_update = status;
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
    buildSpecificProtocolFields=(ele) => {
        const defaults = this.props.datasource.ds_defaults[ele.name]
        const values = this.state.info_ds[ele.name]
        const events = ele.class.getDataSourceEvents(this,ele.name)
        let prot_form = null;
        if (defaults && values) {
            prot_form = ele.class.dataSourceFields(events,values,defaults)
        }
        return({name:ele.name, fields:prot_form})
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */ 
    render(){
        const content_array = ImplementedProtocols.map(this.buildSpecificProtocolFields)

        const jsx_component = (
            <FormPopup
                open={this.props.open}
                title="New DataSource"
                nameOk="SAVE" nameCancel="CANCEL"
                onOkClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}>
                <Stack direction="column" spacing='1rem' flexGrow='1' alignItems="stretch">
                    <SimpleSelect
                        label={"Protocol"}
                        default_value={this.props.datasource.protocol_default}
                        list={this.props.datasource.protocol_avail}
                        value={this.state.protocol_selected}
                        onChange={this.handleProtocolChange}/>
                    {content_array.map(this.buildContents)}
                </Stack>
            </FormPopup>
        );
        return(jsx_component);
    };
    
    componentDidUpdate() {
        if(this.state.need_defaults_update) {
            if (this.props.datasource.protocol_avail.length!==0) {
                this.props.onGetDefaults(this.props.global.backend_instance,this.props.datasource.protocol_avail)
                this.handleDefaultsChange(false)
            }
        }
    }
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    datasource: state.datasource
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onGetDefaults:(api,prot_list)=>dispatch(datasourceActions.getDefaults(api,prot_list)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(DataSourcePopup);