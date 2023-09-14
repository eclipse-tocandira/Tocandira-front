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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddToQueueRoundedIcon from '@mui/icons-material/AddToQueueRounded';
import { Button, Tooltip } from '@mui/material';
// Local Imports
import './Main.css';
import * as authActions from '../../store/auth/actions';
import * as collectorActions from '../../store/collector/actions';
import * as popupsActions from '../../store/popups/actions';
import Frame from '../../component/Frame/Frame';
import ShowProjects from '../Projects/ShowProjects';
import CollectorPopup from '../../component/Popups/CollectorPopup';

// #######################################

/** The main page of the application
* @property `props.auth`: Redux access to auth store.
* @property `props.global`: Redux access to global store.
* @method `props.onLogoutSubmit`: Redux function for auth stote `logout` action.*/
class Main extends React.PureComponent {

    /** Defines the component property types */
    static propTypes = {
        onCheckToken: PropTypes.func,
    }
    /** Defines the component state variables */
    state = {
    }

    /** Description.
    * @param ``: 
    * @returns */
    handleNewCollector=() => {
        this.props.onOpenCollector(true)
    }

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        // NOTE: The onClick event in Main <div> will be executed
        //       after any Click on configuration screen by "bubbling",
        //       this is the easiest way to perform a continuous token
        //       check and logout the user when it becomes invalid.
        let popup=null;
        if (this.props.popups.open_col) popup=<CollectorPopup open={this.props.popups.open_col}/>
    
        const jsx_component = (
            <div onClick={this.props.onCheckToken.bind(this,this.props.global.backend_instance)}>
                {popup}
                <Frame actions={false} back={false} title={"Available Connections"}>
                    <div className='AddProject'>
                        <Tooltip title="New Connection">
                            <Button size='large' variant="contained" color='primary'
                                onClick={this.handleNewCollector}>
                                <AddToQueueRoundedIcon/>
                            </Button>
                        </Tooltip>
                    </div>
                    <ShowProjects/>
                </Frame>
            </div>
        );
        return(jsx_component);
    }

    componentDidMount() {
        this.props.onGetCollectors(this.props.global.backend_instance);
        this.props.onGetDefaultCollector(this.props.global.backend_instance);
    }

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
    popups: state.popups
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onCheckToken: (api_instance)=>dispatch(authActions.validate(api_instance)),
    onGetDefaultCollector: (api_instance)=>dispatch(collectorActions.getDefault(api_instance)),
    onGetCollectors: (api_instance)=>dispatch(collectorActions.getAvail(api_instance)),
    onOpenCollector: (status)=>dispatch(popupsActions.openCollectorPopup(status)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Main);