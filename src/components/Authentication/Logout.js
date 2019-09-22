import React from "react";
import Auth from "../../authentication/Auth";
import { withRouter, Redirect } from "react-router-dom";

const Logout = props => {
  Auth.logout();
  return <Redirect to="/login"></Redirect>;
};

export default withRouter(Logout);
