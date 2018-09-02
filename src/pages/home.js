import React, { Component } from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(
  class HomePage extends Component {
    render() {
      const { isAuthenticated } = this.props;

      return (
        <div className="full center-wrapper">
          <div className="center">
            <div className="home">
              <h1>Hello World</h1>
              <p>This is just a home page that everybody can access </p>

              {isAuthenticated === true ? (
                <React.Fragment>
                  <h4>Seems you're signed in already</h4>
                  <Link className="auth-btn" to="/dashboard">
                    Go To Dashboard
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Link className="auth-btn" to="/signin">
                    Sign In
                  </Link>
                  <Link className="auth-btn" to="/signup">
                    Sign Up
                  </Link>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
);
