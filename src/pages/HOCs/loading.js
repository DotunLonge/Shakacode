import React, { Component } from "react";

function loading(WrappedComponent, check, match) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      if (check !== match) {
        return (
          <div className="full">
            <div className="full center-wrapper">
              <div className="center">
                <h1 className="t-c"> Loading... </h1>
              </div>
            </div>
          </div>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default loading;
