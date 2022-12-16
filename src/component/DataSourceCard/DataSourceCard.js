/** This module holds the view of the React
 * component `DataSourceCard`
 * 
 * Copyright (c) 2017 Aimirim STI.
 * 
 * Dependencies are:
 * - react 
*/

// Imports from modules;
import React from 'react';
import PropTypes from 'prop-types';
// Local Imports
import TitledCard from '../TitledCard/TitledCard';

// #######################################

/** Description
* @property `props.`:
* @method `props.`: */
class DataSourceCard extends React.PureComponent {
    
    /** Defines the component property types */
    static propTypes = {
    };

    /** Defines the component visualization.
    * @returns JSX syntax element */
    render(){
        const card_contents=[];

        const jsx_component = (
            <TitledCard cardprops={{flex:'1 1 auto'}}
                title='Data Sources' contents={card_contents}/>
        );
        return(jsx_component);
    };
    
}

// Make this component visible on import
export default DataSourceCard;