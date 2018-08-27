import React, { Component } from "react";
import "../styles/home.css";
import { Link } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div className="full center-wrapper">
        <div className="center">
          <div className="home">
            <h1>Hello World</h1>
            <p>This is just a home page that everybody can access </p>

            <Link className="auth-btn" to="/signin">
              Sign In
            </Link>
            <Link className="auth-btn" to="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
