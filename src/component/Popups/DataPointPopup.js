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
import {Collapse, Stack, TextField } from '@mui/material'

// Local Imports
import FormPopup from  './FormPopup'
import {ImplementedProtocols, getDataPointAddress} from '../Protocols/Protocols'
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import CustomAlert from '../CustomAlert/CustomAlert';
import * as datapointActions from '../../store/datapoint/actions'
//import './DataPointPopup.css';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataPointPopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        open: PropTypes.bool,
        is_new: PropTypes.bool,
        selected_row: PropTypes.object,
        global: PropTypes.object,
        datasource: PropTypes.object,
        datapoint: PropTypes.object,
        onClose: PropTypes.func,
        onNewSave: PropTypes.func,
        onEditSave: PropTypes.func,
    };

    /** Defines the component state variables */
    state = {
        ds_selected:"",
        info_dp:{},
        validation:{
            address:true,
            name:true,
            unique:true,
        }
    };
    
    /** Description.
    * @param ``: 
    * @returns */
    handleClearErrors=() => {
        const newState = {...this.state};
        newState.validation = {...this.state.validation};
        newState.validation.address = true;
        newState.validation.name = true;
        newState.validation.unique = true;
        this.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleErrorMessage=() => {
        let msg = "";
        if (!this.state.validation.unique) {
            msg = "Duplicated Name "
        } else {
            msg = "Invalid "
            if (!this.state.validation.address){ msg += "Address " }
            if (!this.state.validation.name){
                if (!this.state.validation.address){ msg += "and " }
                msg += "Name " 
            }
        }
        msg += "detected."
        return(msg)
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
    handleSaveClick=() => {
        const dsrow = this.props.datasource.ds_content.find(ele=>ele.name===this.state.ds_selected)
        const info2save = this.state.info_dp[dsrow.protocol.name];

        const address_verify = getDataPointAddress(info2save,dsrow.protocol.name)!=="";
        const name_verify = /^[a-zA-z_]+[a-zA-z0-9]*$/.test(info2save.name);
        const name_equal = this.props.datapoint.dp_content.find(ele=>ele.name===info2save.name)
        
        const newState = {...this.state};
        newState.validation = {...this.state.validation};
        newState.validation.address = address_verify;
        newState.validation.name = name_verify;
        newState.validation.unique = !name_equal;
        this.setState(newState);

        if (this.props.is_new) {
            if (address_verify && name_verify && !name_equal) {
                this.props.onNewSave(this.props.global.backend_instance, info2save);
                this.handleCancelClick();
            }
        } else {
            if (address_verify && name_verify) {
                this.props.onEditSave(this.props.global.backend_instance, info2save);
                this.props.onGetDataPoint(this.props.global.backend_instance);
                this.handleCancelClick();
            }
        }
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleCancelClick=() => {
        this.props.onClose()
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleFixDataPoint=() => {
        const newState = {...this.state};
        const row = this.props.datapoint.dp_content.find(row=>row.name===this.props.selected_row.name);
        if (row) {
            const prot_name = row.access.name;
            newState.ds_selected = row.datasource_name;
            newState.info_dp = {...this.state.info_dp};
            newState.info_dp[prot_name] = row;
        }
        this.setState(newState);
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
        info.datasource_name = ds_name;
        
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
        const events = ele.class.getDataPointEvents(this,ele.name)
        if(!this.props.is_new) {
            // This hack prevents the edit of Name field when editing
            events.onNameChange = null;
        }
        let dp_form = null;
        if(defaults && values){
            dp_form = ele.class.dataPointFields(events,values,defaults)
        }
        return({name:ele.name, fields:dp_form})
    }
    /** Description.
    * @param ``: 
    * @returns */
    filterData=(row) => {
        return(row.active && row.collector_id===this.props.collector.selected.id)
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */ 
    render(){
        const content_array = ImplementedProtocols.map(this.buildSpecificProtocolFields);
        const ds_select_options = this.props.datasource.ds_content.filter(this.filterData).map(element => element.name);
        const specific_elements = content_array.map(this.buildContents);
        let valid_data = null;
        let select_component = null;
        if (this.props.is_new){
            valid_data = this.state.validation.address && this.state.validation.name && this.state.validation.unique;
            select_component = <SimpleSelect
                label={"DataSource"}
                default_value={""}
                list={ds_select_options}
                value={this.state.ds_selected}
                onChange={this.handleDataSourceChange}/>
        } else {
            valid_data = this.state.validation.address && this.state.validation.name;
            select_component = <TextField variant="outlined" label="DataSource" type='text' disabled
                fullWidth value={this.state.ds_selected}/>
        }

        const err_msg = this.handleErrorMessage();
        const alert = <CustomAlert type='error' elevate
            reset={this.handleClearErrors} msg={err_msg}/>

        const jsx_component = (
            <FormPopup
                open={this.props.open}
                title="New DataPoint"
                nameOk="SAVE" nameCancel="CANCEL"
                onOkClick={this.handleSaveClick}
                onCancelClick={this.handleCancelClick}>
                <Stack direction="column" spacing='1rem' flexGrow='1' alignItems="stretch">
                    {select_component}
                    {specific_elements}
                    <Collapse in={!valid_data}>{alert}</Collapse>
                </Stack>
            </FormPopup>
        );
        return(jsx_component);
    }

    componentDidMount=() => {
        if(!this.props.is_new){
            this.handleFixDataPoint()
        }
    }
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    datasource: state.datasource,
    datapoint: state.datapoint,
    collector: state.collector,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onNewSave:(api,info)=>dispatch(datapointActions.pushData(api,info)),
    onEditSave:(api,info)=>dispatch(datapointActions.putData(api,info)),
    onGetDataPoint:(api)=>dispatch(datapointActions.getData(api)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(DataPointPopup);