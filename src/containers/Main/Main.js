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
// Local Imports
import './Main.css';
import * as authActions from '../../store/auth/actions';
import Frame from '../../component/Frame/Frame';
import ShowProjects from '../Projects/ShowProjects';
import AddToQueueRoundedIcon from '@mui/icons-material/AddToQueueRounded';
import { Button, Tooltip } from '@mui/material';

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

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        // NOTE: The onClick event in Main <div> will be executed
        //       after any Click on configuration screen by "bubbling",
        //       this is the easiest way to perform a continuous token
        //       check and logout the user when it becomes invalid.
        const jsx_component = (
            <div onClick={this.props.onCheckToken.bind(this,this.props.global.backend_instance)}>
                <Frame actions={false} back={false} title={"Available Connections"}>
                    <div className='AddProject'>
                        <Tooltip title="New Connection">
                            <Button size='large' variant="contained" color='primary'><AddToQueueRoundedIcon/></Button>
                        </Tooltip>
                    </div>
                    <ShowProjects/>
                </Frame>
            </div>
        );
        return(jsx_component);
    }

    componentDidMount() {
    }

}

/** Map the Redux state to some component props */
const reduxStateToProps = (state) =>({
    global: state.global,
});

/** Map the Redux actions dispatch to some component props */
const reduxDispatchToProps = (dispatch) =>({
    onCheckToken: (api_instance)=>dispatch(authActions.validate(api_instance)),
});

// Make this component visible on import
export default connect(reduxStateToProps,reduxDispatchToProps)(Main);