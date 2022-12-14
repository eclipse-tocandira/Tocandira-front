/** This module contains the withRouter
 * wrapper since this function was removed
 * in the new versions of react-router
 * 
 * Copyright (c) 2017 Aimirim STI.
 * Dependencies are:
 * - react-router-dom 
*/

// Imports from modules
import { useLocation, useNavigate, useParams, } from "react-router-dom";

// #######################################

export default function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }