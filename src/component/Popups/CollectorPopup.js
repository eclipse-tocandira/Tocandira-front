/** This module holds the view of the React
 * component `CollectorPopup`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
 * - react-redux 
*/

// Imports from modules;
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// Local Imports
import FormPopup from  './FormPopup'
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import * as popupsActions from '../../store/popups/actions';
import * as collectorActions from '../../store/collector/actions';
import { InputAdornment, Stack, TextField } from '@mui/material';
//import './CollectorPopup.css';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class CollectorPopup extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        open: PropTypes.bool,
    };
    /** Defines the component state variables */
    state = {
    };
    // /** Context Definition*/
    // static contextType ;

    /** Description.
    * @param ``: 
    * @returns */
    handleSaveClick=() => {
        if (this.props.collector.selected.id){
            this.props.onUpdate(this.props.global.backend_instance,{...this.state})
        } else {
            this.props.onSave(this.props.global.backend_instance,{...this.props.collector.default, ...this.state})
        }
        this.handleCancelClick()
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleCancelClick=() => {
        this.props.onSelectCollector(null)
        this.props.onClose()
    }

    /** Description.
    * @param ``: 
    * @returns */
    getValuesToEdit=() => {
        const newState = {...this.props.collector.selected};
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    getValuesDefault=() => {
        const newState = {
            ssh_port: this.props.collector.default.ssh_port,
            opcua_port: this.props.collector.default.opcua_port,
            health_port: this.props.collector.default.health_port,
            update_period: this.props.collector.default.update_period,
        };
        this.setState(newState);
    }
    
    /** Description.
    * @param ``: 
    * @returns */
    handleNameChange=(event) => {
        const newState = {...this.state};
        newState.name = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handleIpChange=(event) => {
        const newState = {...this.state};
        newState.ip = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handleSSHPortChange=(event) => {
        const newState = {...this.state};
        newState.ssh_port = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handleSSHUserChange=(event) => {
        const newState = {...this.state};
        newState.ssh_user = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handleSSHPasswordChange=(event) => {
        const newState = {...this.state};
        newState.ssh_pass = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handleOpcuaPortChange=(event) => {
        const newState = {...this.state};
        newState.opcua_port = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handleHealthPortChange=(event) => {
        const newState = {...this.state};
        newState.health_port = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handlePeriodChange=(event) => {
        const newState = {...this.state};
        newState.update_period = event.target.value;
        this.setState(newState);
    }



    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        let new_col=true;
        if (this.props.collector.selected.id) { new_col=false; }
        const jsx_component = (
            <FormPopup
                open={this.props.open} title={(new_col)?"Create Collector":"Edit Collector"}
                nameOk={(new_col)?"CREATE":"UPDATE"} nameCancel="CANCEL"
                onCancelClick={this.handleCancelClick}
                onOkClick={this.handleSaveClick} cardWidth={'xs'}>
                <Stack direction="column" spacing="1rem">
                    <TextField variant="outlined" label="Name" type='text' required
                        fullWidth InputLabelProps={{ shrink: true }}
                        value={this.state.name}
                        placeholder={this.props.collector.default.name}
                        onChange={this.handleNameChange}>
                    </TextField>
                    <Stack direction="row" spacing="1rem">
                        <TextField variant="outlined" label="IP Address" type='text' required
                            fullWidth InputLabelProps={{ shrink: true }}
                            value={this.state.ip}
                            placeholder={this.props.collector.default.ip}
                            onChange={this.handleIpChange}>
                        </TextField>
                        <TextField variant="outlined" label="Read Frequency" type='tel' required
                            fullWidth InputLabelProps={{ shrink: true }}
                            InputProps={{ endAdornment: <InputAdornment position="end">seconds</InputAdornment> }}
                            value={this.state.update_period}
                            placeholder={this.props.collector.default.update_period.toString()}
                            onChange={this.handlePeriodChange}>
                        </TextField>
                    </Stack>
                    <Stack direction="row" spacing="1rem">
                        <TextField variant="outlined" label="SSH Username" type='text' required
                            fullWidth InputLabelProps={{ shrink: true }}
                            value={this.state.ssh_user}
                            placeholder={this.props.collector.default.ssh_user}
                            onChange={this.handleSSHUserChange}>
                        </TextField>
                        <TextField variant="outlined" label="SSH Password" type='password' required
                            fullWidth InputLabelProps={{ shrink: true }}
                            value={this.state.ssh_pass}
                            onChange={this.handleSSHPasswordChange}>
                        </TextField>
                    </Stack>
                    <Stack direction="row" spacing="1rem">
                        <TextField variant="outlined" label="SSH Port" type='tel' required
                            InputLabelProps={{ shrink: true }}
                            value={this.state.ssh_port}
                            placeholder={this.props.collector.default.ssh_port.toString()}
                            onChange={this.handleSSHPortChange}>
                        </TextField>
                        <TextField variant="outlined" label="Variables Port" type='tel' required
                            InputLabelProps={{ shrink: true }}
                            value={this.state.opcua_port}
                            placeholder={this.props.collector.default.opcua_port.toString()}
                            onChange={this.handleOpcuaPortChange}>
                        </TextField>
                        <TextField variant="outlined" label="Monitor Port" type='tel' required
                            InputLabelProps={{ shrink: true }}
                            value={this.state.health_port}
                            placeholder={this.props.collector.default.health_port.toString()}
                            onChange={this.handleHealthPortChange}>
                        </TextField>
                    </Stack>
                </Stack>
            </FormPopup>
        );
        return(jsx_component);
    };

    componentDidMount(){
        if (this.props.collector.selected.id) {
            this.getValuesToEdit();
        } else{
            this.getValuesDefault();
        }
    }
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    collector: state.collector,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onClose:()=>dispatch(popupsActions.openCollectorPopup(false)),
    onSave:(api,col)=>dispatch(collectorActions.newCollector(api,col)),
    onUpdate:(api,col)=>dispatch(collectorActions.updateCollector(api,col)),
    onSelectCollector: (id)=>dispatch(collectorActions.selectCollector(id)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(CollectorPopup);