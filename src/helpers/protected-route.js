import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = props => {
  const role = props.role,
    isAuthenticated = props.isAuthenticated,
    allowed = props.allowed;
  // is route authenticated ?
  if (isAuthenticated) {
    //if yes, check if the allowed property matches the role from the server response
    if (allowed === role) {
      return <Route {...props} />;
    }
  }
  // if non of these conditions match, but the type property states that the route is an authentication route, then let the page load
  else if (allowed === "auth") {
    return <Route {...props} />;
  }
  // else redirect to the homepage
  else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
