/** This module holds the view of the React
 * component `ProjectThumbnail`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardMedia, Tooltip } from '@mui/material';
// Local Imports
import './ProjectThumbnail.css';
import SimpleIconMenu from '../SimpleIconMenu/SimpleIconMenu';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class ProjectThumbnail extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        goTo: PropTypes.func,
        menuoptions: PropTypes.array,
    };
    /** Defines the component state variables */
    state = {
    };
    // /** Context Definition*/
    // static contextType ;
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        let Color=null;
        if(this.props.active){Color='mediumseagreen';}else{Color='crimson';}
        let Active_text = '';
        if(this.props.active){Active_text='Online';}else{Active_text='Offline';}
        
        const jsx_component = (
            <Card className='ThumbnailCard' sx={{borderRadius:'0.5rem'}}>
                <Tooltip title={Active_text} followCursor disableInteractive>
                    <Button color='primary' sx={{padding:'0rem', borderRadius: '0.5rem'}} onClick={this.props.goTo}>
                        <div className='StatusBar' style={{background:Color}}/>
                            <CardMedia className='Thumbnail' component="img" image={'./no-thumbnail.svg'} alt="Project Thumbnail"/>
                    </Button>
                </Tooltip>
                <SimpleIconMenu title='Project Options' style={{position:'absolute', right:'0' }} items={this.props.menuoptions}/>
            </Card>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default ProjectThumbnail;