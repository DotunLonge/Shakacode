import React, { Component } from "react";
import "../styles/error-page.css";
import { Link } from "react-router-dom";

class ErrorPage extends Component {
  render() {
    return (
      <div className="full center-wrapper">
        <div className="center">
          <div className="xs-12 t-c">
            <Link id="go-back" to="/">
              Home
            </Link>
          </div>

          <div className="error-page">
            <h1>404</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
