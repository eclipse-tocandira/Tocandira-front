/** This module holds the view of the React
 * component `Main`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react
 * - react-redux
 * - @mui/material
*/

// Imports from modules;
import React from 'react';
import { connect } from 'react-redux';
import { Stack, Button, Card, CardContent, Typography, CardActions } from '@mui/material';
// Local Imports
import './Main.css';
import * as authActions from '../../store/auth/actions'
import * as globalActions from '../../store/global/actions'
import CollectorCard from '../../component/CollectorCard/CollectorCard';
import DataSourceCard from '../../component/DataSourceCard/DataSourceCard';
import DataPointCard from '../../component/DataPointCard/DataPointCard';

// #######################################

/** The main page of the application
* @property `props.auth`: Redux access to auth store.
* @property `props.global`: Redux access to global store.
* @method `props.onLogoutSubmit`: Redux function for auth stote `logout` action.*/
class Main extends React.PureComponent {

    /** Defines the component state variables */
    state = {
        collector:{
            ip:'127.0.0.1',
            valid_ip:true,
            port:4800,
            interval:12
        },
        datasource:{
            content_rows:[
                {name:"test",plc_ip:"0.0.0.0",protocol:{name:"Siemens"}},
                {name:"test2",plc_ip:"1.1.1.1",protocol:{name:"Siemens"}},
                {name:"test3",plc_ip:"1.1.1.1",protocol:{name:"Rockwell"}},
                {name:"test4",plc_ip:"1.1.1.1",protocol:{name:"Rockwell"}},
                {name:"test5",plc_ip:"1.1.1.1",protocol:{name:"Modbus"}}
            ],
            selected_row:{name:null,id:-1}
        },
        datapoint:{
            content_rows:[
                {name:"var1",description:"my variable 1",datasource_name:"test1",access:{name:"Siemens",data:{address:"DB100.DBD48"}}},
                {name:"var2",description:"my variable 2",datasource_name:"test3",access:{name:"Rockwell",data:{tag_name:"VAZ_VAPOR"}}},
                {name:"var3",description:"my variable 3",datasource_name:"test3",access:{name:"Rockwell",data:{tag_name:"Fix_ANALOG[75]"}}},
                {name:"var4",description:"my variable 4",datasource_name:"test1",access:{name:"Siemens",data:{address:"DB203.DBX8.8"}}},
                {name:"var5",description:"my variable 5",datasource_name:"test5",access:{name:"Modbus",data:{address:"47751"}}}
            ],
            selected_row:{name:null,id:-1}
        }
    }

    /** Description.
    * @param ``: */
    handleLogoutSubmission=() => {
        this.props.onTokenInvalid()
        this.props.onLogoutSubmit()
    }
    /** Description.
    * @param ``: */
    handleCollectorIP=(event) => {
        const newState = {...this.state};
        newState.collector = {...this.state.collector};
        newState.collector.ip = event.target.value;
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleCollectorInterval=(event) => {
        const newState = {...this.state};
        newState.collector = {...this.state.collector};
        newState.collector.interval = parseInt(event.target.value);
        this.setState(newState);
    }
    /** Description.
    * @param ``: */
    handleCollectorPort=(event) => {
        const newState = {...this.state};
        newState.collector = {...this.state.collector};
        newState.collector.port = parseInt(event.target.value);
        this.setState(newState);
    }

    /** Description.
    * @param ``: */
     handleDataSourceRowClick=(name,index) => {
        const newDatasource = {...this.state.datasource};
        if (name===this.state.datasource.selected_row.name){
            newDatasource.selected_row = {name:null,id:-1};
        } else {
            newDatasource.selected_row = {name:name,id:index};
        }
        this.setState({datasource:newDatasource});
    }
    /** Description.
    * @param ``: */
    handleDataSourceNewClick=() => {
        const newDatasource = {...this.state.datasource};
        this.setState({datasource:newDatasource});
    }
    /** Description.
    * @param ``: */
    handleDataSourceEditClick=() => {
        const newDatasource = {...this.state.datasource};
        this.setState({datasource:newDatasource});
    }
    /** Description.
    * @param ``: */
    handleDataSourceDeleteClick=() => {
        const newDatasource = {...this.state.datasource};
        this.setState({datasource:newDatasource});
    }

    /** Description.
    * @param ``: */
     handleDataPointRowClick=(name,index) => {
        const newDatapoint = {...this.state.datapoint};
        if (name===this.state.datapoint.selected_row.name){
            newDatapoint.selected_row = {name:null,id:-1};
        } else {
            newDatapoint.selected_row = {name:name,id:index};
        }
        this.setState({datapoint:newDatapoint});
    }
    /** Description.
    * @param ``: */
    handleDataPointNewClick=() => {
        const newDatapoint = {...this.state.datapoint};
        this.setState({datapoint:newDatapoint});
    }
    /** Description.
    * @param ``: */
    handleDataPointEditClick=() => {
        const newDatapoint = {...this.state.datapoint};
        this.setState({datapoint:newDatapoint});
    }
    /** Description.
    * @param ``: */
    handleDataPointDeleteClick=() => {
        const newDatapoint = {...this.state.datapoint};
        this.setState({datapoint:newDatapoint});
    }


    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <div className='Main'>
            
                <Button variant='contained'
                    sx={{margin:'1rem', alignSelf:'flex-end'}}
                    size='large'
                    color='inherit'
                    fullWidth={false}
                    onClick={this.handleLogoutSubmission}>
                        LOGOUT
                </Button>

            <Stack direction='column' flexGrow='1' alignItems='stretch'>
                <Typography variant='h3'
                    align='left'
                    color='white'
                    margin='1rem 0 1rem 0'>
                        Main Configurations 
                </Typography>

                <Card className='MainCard' sx={{borderRadius:"1rem 0 0 0",backgroundColor:"#eee"}}>
                    <CardContent>
                        <Stack spacing='5rem' direction='column'>
                            <Stack direction='row' spacing='5rem'>
                                <CollectorCard
                                    ip={this.state.collector.ip}
                                    port={this.state.collector.port}
                                    interval={this.state.collector.interval}
                                    timeout={this.state.collector.timeout}
                                    onIpChange={this.handleCollectorIP}
                                    onPortChange={this.handleCollectorPort}
                                    onIntervalChange={this.handleCollectorInterval}/>
                                <DataSourceCard
                                    content_rows={this.state.datasource.content_rows}
                                    selected_row={this.state.datasource.selected_row}
                                    onRowClick={this.handleDataSourceRowClick}
                                    onNewClick={this.handleDataSourceNewClick}
                                    onEditClick={this.handleDataSourceEditClick}
                                    onDeleteClick={this.handleDataSourceDeleteClick}/>
                            </Stack>
                        <DataPointCard
                            content_rows={this.state.datapoint.content_rows}
                            selected_row={this.state.datapoint.selected_row}
                            onRowClick={this.handleDataPointRowClick}
                            onNewClick={this.handleDataPointNewClick}
                            onEditClick={this.handleDataPointEditClick}
                            onDeleteClick={this.handleDataPointDeleteClick}/>
                        </Stack>
                    </CardContent>
                    <CardActions>
                    <Stack direction='row' spacing='2rem' margin='1rem'>
                        <Button variant='contained'
                        size='large'
                        color='primary'>
                            APPLY
                        </Button>

                        <Button variant='contained'
                        size='large'
                        color='inherit'>
                            RESET
                        </Button>
                    </Stack>
                    </CardActions>
                </Card>
            </Stack>
            </div>
        );
        return(jsx_component);
    };

    componentDidMount() {
        if (this.props.auth.token_valid){
            this.props.onTokenValid(this.props.auth.token, this.props.auth.token_type)
        }
    };

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    auth: state.auth,
    global: state.global
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onLogoutSubmit: ()=>dispatch(authActions.logout()),
    onTokenInvalid: ()=>dispatch(globalActions.clearAuthToken()),
    onTokenValid: (token,token_type)=>dispatch(globalActions.setAuthToken(token,token_type)),
    onCheckToken: (api_instance)=>dispatch(authActions.validate(api_instance)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Main);