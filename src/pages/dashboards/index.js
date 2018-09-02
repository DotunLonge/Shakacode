import React from "react";
import "../../styles/dashboard.css";
import { connect } from "react-redux";
import AdminDashboardPage from "./admin";
import UserDashboardPage from "./user";
import loading from "../HOCs/loading";
import { signout } from "../../redux-store/action-creators/auth";

const IndexDashboard = ({ signout, isAdmin, isAuthenticated, ...rest }) => {
  let Comp = isAdmin ? AdminDashboardPage : UserDashboardPage;

  let EnhancedComponent = loading(Comp, isAuthenticated, true);

  return <EnhancedComponent signout={signout} {...rest} />;
};

const mapStateToProps = state => {
  return {
    isAdmin: state.auth.data.isAdmin,
    isAuthenticated: state.auth.isAuthenticated,
    type: state.auth.action_type
  };
};

const mapDispatchToProps = {
  signout: () => signout()
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndexDashboard);
