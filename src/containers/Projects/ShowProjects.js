/** This module holds the view of the React
 * component `ShowProjects`
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
import { Navigate } from 'react-router-dom';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
// Local Imports
import './ShowProjects.css';
import ProjectCard from '../../component/ProjectCard/ProjectCard';
import DeletePopup from '../../component/Popups/DeletePopup';
import * as routeNames from '../../routeNames';
import * as collectorActions from '../../store/collector/actions'
import * as popupsActions from '../../store/popups/actions'

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class ShowProjects extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
    };
    /** Defines the component state variables */
    state = {
        redirect: null,
        state_popup_delete: false,
        delete_content: { title: "", msg: "" },
        id_collector: null
    };

    /** Description.
    * @param ``: 
    * @returns */
    handleClick=(id) => {
        this.props.onSelectCollector(id);
        const newState = {...this.state};
        newState.redirect = <Navigate to={routeNames.COLLECTOR}/>
        this.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleEditItem=(id) => {
        this.props.onSelectCollector(id);
        this.props.onOpenCollector(true);
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleDeleteItem=(id) => {
        const delete_title = 'Delete the collector';
        const delete_msg = 'Do you really want to delete this collector?';

        const newState = {...this.state};
        newState.delete_content = { title: delete_title, msg: delete_msg };
        newState.state_popup_delete = true;
        newState.id_collector = id;
        this.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleDeleteCollector= () => {
        this.props.onDeleteCollector(
            this.props.global.backend_instance,
            this.state.id_collector
        );
        const newState = {...this.state};
        newState.state_popup_delete = false;
        newState.id_collector = null;
        this.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleDeleteCancel=() => {
        const newState = {...this.state};
        newState.state_popup_delete = false;
        newState.id_collector = null;
        this.setState(newState);
    }

    /** Description.
    * @param ``: 
    * @returns */
    buildCards=(ele,index) => {
        const menu = [
            {item:"Edit",callback:this.handleEditItem.bind(this,ele.id)},
            {item:"Delete",callback:this.handleDeleteItem.bind(this,ele.id)},
        ]
        const card = <Grid2 key={index}>
            <ProjectCard name={ele.name} active={ele.status.ssh} address={ele.ip}
                goTo={this.handleClick.bind(this,ele.id)} menuoptions={menu}/>
        </Grid2>
        return(card)
    }
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const delete_popup = (
            <DeletePopup open={this.state.state_popup_delete}
                content={this.state.delete_content}
                nameOk={"YES"} nameCancel={"CANCEL"}
                onOkClick={this.handleDeleteCollector}
                onCancelClick={this.handleDeleteCancel} />
        );
        const jsx_component = (
            <Grid2 container spacing='2rem' direction="row" alignItems="stretch" marginRight='3rem'>
                {this.state.redirect}
                {this.props.collector.list.map(this.buildCards)}
                {delete_popup}
            </Grid2>
        )
        return(jsx_component);
    };
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    popups: state.popups,
    collector: state.collector,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onSelectCollector: (id)=>dispatch(collectorActions.selectCollector(id)),
    onDeleteCollector: (api,id)=>dispatch(collectorActions.remove(api,id)),
    onOpenCollector: (status)=>dispatch(popupsActions.openCollectorPopup(status)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(ShowProjects);