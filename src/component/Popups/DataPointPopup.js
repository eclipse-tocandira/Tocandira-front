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
import * as datapointActions from '../../store/datapoint/actions'
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
        need_defaults_update:true,
        info_dp:{}
    };
    
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
        const ds_name = event.target.value;
        const dsrow = this.props.datasource.ds_content.find(ele=>ele.name===ds_name);
        const prot_name = dsrow.protocol.name;
        const dp_defaults = this.props.datapoint.dp_defaults[prot_name];
        const prot_class = ImplementedProtocols.find(ele=>ele.name===prot_name).class;
        const info = prot_class.parseDataPointDefault2Values(dp_defaults);

        newState.ds_selected = ds_name;
        newState.info_dp = {...this.state.info_dp};
        newState.info_dp[prot_name] = info;

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
        const defaults = this.props.datapoint.dp_defaults[ele.name]
        const values = this.state.info_dp[ele.name]
        let dp_form = null;
        if(defaults && values){
            dp_form = ele.class.dataPointFields({},values,defaults)
        }
        return({name:ele.name, fields:dp_form})
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
    datasource: state.datasource,
    datapoint: state.datapoint,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onGetDefaults:(api,prot_list)=>dispatch(datapointActions.getDefaults(api,prot_list)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(DataPointPopup);