import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "../authentication/Auth";

const ProtectedRoute = ({ component: Component, ...restProps }) => (
  <Route
    {...restProps}
    render={props =>
      Auth.isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
