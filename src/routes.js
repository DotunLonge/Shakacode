import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/home";
import ProtectedRoute from "./helpers/protected-route";
import { connect } from "react-redux";
import DashboardPage from "./pages/dashboard";
import ErrorPage from "./pages/error-page";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";

const Routes = ({ role, isAuthenticated }) => {
  return (
    <Router>
      <Switch>
        <Route component={HomePage} exact path="/" />
        <ProtectedRoute
          component={DashboardPage}
          allowed="admin"
          role={role}
          exact
          path="/dashboard"
          isAuthenticated={isAuthenticated}
        />

        <ProtectedRoute
          component={LoginPage}
          role={role}
          allowed="auth"
          exact
          path="/signin"
          isAuthenticated={isAuthenticated}
        />

        <ProtectedRoute
          component={SignupPage}
          role={role}
          allowed="auth"
          exact
          path="/signup"
          isAuthenticated={isAuthenticated}
        />

        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    role: state.auth.data.role,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Routes);
