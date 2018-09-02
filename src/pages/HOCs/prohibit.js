import React, { Component } from "react";
import { Link } from "react-router-dom";

function prohibit(WrappedComponent, isAdmin) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      if (isAdmin !== true) {
        return (
          <div className="full">
            <div className="full center-wrapper">
              <div className="center t-c">
                <h1> You Need To Be An Admin To See This Page.</h1>
                <Link className="auth-btn" to="/">
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default prohibit;
