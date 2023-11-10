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
import { Button, CircularProgress, Collapse, Icon, IconButton, InputAdornment, Stack, TextField} from '@mui/material';
// Local Imports
import FormPopup from  './FormPopup'
import * as popupsActions from '../../store/popups/actions';
import * as collectorActions from '../../store/collector/actions';
import LockResetIcon from '@mui/icons-material/LockReset';
import CustomAlert from '../CustomAlert/CustomAlert';
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
        pass_error:false,
        ssh_user:'',
        ssh_pass:'',
        name:'',
        ip:'',
    }
    // /** Context Definition*/
    // static contextType ;

    /** Description.
    * @param ``: 
    * @returns */
    handleSaveClick=() => {
        this.handleClearPassError()
        if (!this.passCheck()) {
            if (this.props.collector.selected.id){
                this.props.onUpdate(this.props.global.backend_instance,{...this.state})
            } else {
                this.props.onSave(this.props.global.backend_instance,{...this.props.collector.default, ...this.state})
            }
            this.handleCancelClick()
        }
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
    passCheck=() => {
        let pass_error=false;
        if(this.state.ssh_pass==='' && !this.state.pass_lock){
            pass_error=true;
            this.props.onAlertChange('Invalid Password. It can not be Blank.','error')
        }
        const newState = {...this.state};
        newState.pass_error = pass_error;
        this.setState(newState);
        return(pass_error)
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleTestClick=() => {
        this.handleClearPassError();
        if (!this.passCheck()){
            this.props.onTest(this.props.global.backend_instance,{...this.props.collector.default, ...this.state})
            const newState = {...this.state};
            newState.pass_error = true;
            this.setState(newState);
        }
    }

    /** Description.
    * @param ``: 
    * @returns */
    getValuesToEdit=() => {
        const newState = {...this.props.collector.selected};
        newState.pass_lock=true;
        newState.ssh_pass_placeholder='********';
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    getValuesDefault=() => {
        const newState = {...this.state,
            pass_lock: false,
            ssh_port: this.props.collector.default.ssh_port,
            opcua_port: this.props.collector.default.opcua_port,
            prj_path: this.props.collector.default.prj_path,
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
    handleResetPassword=(event) => {
        const newState = {...this.state};
        newState.pass_lock = false;
        newState.ssh_pass = '';
        newState.ssh_pass_placeholder = '';
        this.setState(newState);
    }
    /** Description.
    * @param ``: 
    * @returns */
    handlePrjPathChange=(event) => {
        const newState = {...this.state};
        newState.prj_path = event.target.value;
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

    /** Description.
    * @param ``: 
    * @returns */
    handleClearPassError=() => {
        const loading = <Icon sx={{display:'flex', alignItems:'center'}}> <CircularProgress size={'1.5rem'} /> </Icon>
        this.props.onAlertChange(loading,'info')
        const newState = {...this.state};
        newState.pass_error = false;
        this.setState(newState);
    }


    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const alert = <CustomAlert type={this.props.collector.type_message} elevate
            reset={this.handleClearPassError} msg={this.props.collector.message}/>
        
        let new_col=true;
        if (this.props.collector.selected.id) { new_col=false; }

        const jsx_component = (
            <FormPopup
                open={this.props.open} title={(new_col)?"Create Collector":"Edit Collector"}
                nameOk={(new_col)?"CREATE":"UPDATE"} nameCancel="CANCEL"
                onCancelClick={this.handleCancelClick}
                onOkClick={this.handleSaveClick} cardWidth={'xs'}
                onTestClick={this.handleTestClick}
                nameTest={(this.state.pass_lock)?null:"Check SSH"}
                >
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
                            fullWidth InputLabelProps={{ shrink: true }} disabled={this.state.pass_lock}
                            value={this.state.ssh_pass}
                            placeholder={this.state.ssh_pass_placeholder}
                            InputProps={(new_col)?null:{ endAdornment: <IconButton onClick={this.handleResetPassword} color='primary' sx={{marginRight:'-0.8rem'}}><LockResetIcon fontSize='large'/></IconButton>}}
                            onChange={this.handleSSHPasswordChange}>
                        </TextField>
                    </Stack>
                    <TextField variant="outlined" label="Gateway Path on Collector" type='text' required
                        fullWidth InputLabelProps={{ shrink: true }}
                        value={this.state.prj_path}
                        InputProps={{ startAdornment: <InputAdornment position="start"><Button style={{textTransform: 'none', padding:'0.2rem'}} disabled variant='outlined'>ssh://</Button></InputAdornment>}}
                        placeholder={this.props.collector.default.prj_path}
                        onChange={this.handlePrjPathChange}/>
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
                    <Collapse in={this.state.pass_error}>{alert}</Collapse>
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
    onTest:(api,col)=>dispatch(collectorActions.newTest(api,col)),
    onAlertChange:(msg,typ)=>dispatch(collectorActions.changeMessageTest(msg,typ)),
    onUpdate:(api,col)=>dispatch(collectorActions.updateCollector(api,col)),
    onSelectCollector: (id)=>dispatch(collectorActions.selectCollector(id)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(CollectorPopup);