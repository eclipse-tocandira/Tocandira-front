/** This module holds the view of the React
 * component `ProjectCard`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Stack, Typography } from '@mui/material';
// Local Imports
import './ProjectCard.css';
import ProjectThumbnail from '../ProjectThumbnail/ProjectThumbnail';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class ProjectCard extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
        name:PropTypes.string,
        active:PropTypes.bool,
        cardprops:PropTypes.object,
        menuoptions:PropTypes.array,
        goTo:PropTypes.func,
    };
    
    state = {
    }
    
    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const jsx_component = (
            <Card className='StatusCard' sx={{backgroundColor:'transparent', borderRadius:'0 0 0 0'}} elevation='0'>
                <ProjectThumbnail active={this.props.active} goTo={this.props.goTo}/>
                    <Stack direction='row' spacing='0.5rem' alignItems='center' justifyContent='space-between' paddingTop='0.5rem'>
                        <Typography variant='subtitle2'>{this.props.name}</Typography>
                    </Stack>
            </Card>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default ProjectCard;