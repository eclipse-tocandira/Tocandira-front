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
        projects:[
            {name:'TT09',active:true,status:'Online',modified:'Edited now'},
            {name:'EB01',active:false,status:'Offline',modified:'Edited 5 months ago'},
            {name:'EB02',active:false,status:'Offline',modified:'Edited last week'},
            {name:'TL02',active:true,status:'Online',modified:'Edited 1 week ago'},
        ],
        redirect: null
    };

    /** Description.
    * @param ``: 
    * @returns */
    handleClickMock=(event) => {
        const newState = {...this.state};
        newState.redirect = <Navigate to={routeNames.COLLECTOR}/>
        this.setState(newState);
    }
    
    /** Description.
    * @param ``: 
    * @returns */
    buildCards=(ele,index) => {
        const card = <Grid2 key={index}>
            <ProjectCard name={ele.name} active={ele.active} modified={ele.modified} goTo={this.handleClickMock}/>
        </Grid2>
        return(card)
    }
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <Grid2 container spacing='2rem' direction="row" alignItems="stretch" marginRight='3rem'>
                {this.state.redirect}
                {this.state.projects.map(this.buildCards)}
            </Grid2>
        )
        return(jsx_component);
    };
    
}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    online: state.online,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(ShowProjects);