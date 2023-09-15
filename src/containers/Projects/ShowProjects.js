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
import * as routeNames from '../../routeNames';
import * as collectorActions from '../../store/collector/actions'
import * as popupsActions from '../../store/popups/actions'
import CollectorPopup from '../../component/Popups/CollectorPopup';

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
        this.props.onDeleteCollector(this.props.global.backend_instance,id);
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
        const jsx_component = (
            <Grid2 container spacing='2rem' direction="row" alignItems="stretch" marginRight='3rem'>
                {this.state.redirect}
                {this.props.collector.list.map(this.buildCards)}
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