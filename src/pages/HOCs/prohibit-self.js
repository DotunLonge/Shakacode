import React, { Component } from "react";
import { Link } from "react-router-dom";

function prohibitSelf(WrappedComponent, verifiedID) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    goBack = () => {
      return this.props.history.goBack();
    };

    render() {
      if (verifiedID === this.props.match.params.id) {
        return (
          <div className="full">
            <div className="full center-wrapper">
              <div className="center t-c">
                <h1> You Cannot Perform This Action On Yourself. </h1>
                <Link className="auth-btn" to="#" onClick={this.goBack}>
                  Go Back
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

export default prohibitSelf;
