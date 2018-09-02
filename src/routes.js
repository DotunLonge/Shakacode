import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/home";
import { AuthRoute, ProtectedRoute } from "./helpers/routes";
import { connect } from "react-redux";
import DashboardPage from "./pages/dashboards";
import ErrorPage from "./pages/error-page";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import viewAll from "./pages/users/view-all";
import prohibit from "./pages/HOCs/prohibit";
import viewOne from "./pages/users/view-one";
import loading from "./pages/HOCs/loading";
import DeleteUser from "./pages/users/delete-user";
import EditUser from "./pages/users/edit-user";
import prohibitSelf from "./pages/HOCs/prohibit-self";

const Routes = ({ isAdmin, isAuthenticated, verifiedID }) => {
  return (
    <Router>
      <Switch>
        <Route component={HomePage} exact path="/" />

        <ProtectedRoute
          component={DashboardPage}
          exact
          path="/dashboard"
          isAuthenticated={isAuthenticated}
        />

        <AuthRoute
          component={loading(
            LoginPage,
            isAuthenticated,
            isAuthenticated !== "" && isAuthenticated
          )}
          exact
          path="/signin"
          isAuthenticated={isAuthenticated}
        />

        <AuthRoute
          component={loading(
            SignupPage,
            isAuthenticated,
            isAuthenticated !== "" && isAuthenticated
          )}
          exact
          path="/signup"
          isAuthenticated={isAuthenticated}
        />

        <ProtectedRoute
          exact
          path="/dashboard/users"
          component={loading(prohibit(viewAll, isAdmin), isAuthenticated, true)}
          isAuthenticated={isAuthenticated}
        />

        <ProtectedRoute
          exact
          path="/dashboard/users/:id"
          component={loading(prohibit(viewOne, isAdmin), isAuthenticated, true)}
          isAuthenticated={isAuthenticated}
        />

        <ProtectedRoute
          exact
          path="/dashboard/users/:id/edit"
          component={loading(
            prohibit(EditUser, isAdmin),
            isAuthenticated,
            true
          )}
          isAuthenticated={isAuthenticated}
        />

        <ProtectedRoute
          exact
          path="/dashboard/users/:id/delete"
          component={loading(
            prohibitSelf(prohibit(DeleteUser, isAdmin), verifiedID),
            isAuthenticated,
            true
          )}
          isAuthenticated={isAuthenticated}
        />

        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    isAdmin: state.auth.data.isAdmin,
    verifiedID: state.auth.data.id,
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Routes);
