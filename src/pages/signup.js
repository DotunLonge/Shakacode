import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../redux-store/action-creators/auth";
import { authActions as auth } from "../redux-store/actions/auth";
import "../styles/auth.css";

const mapStateToProps = state => {
  return {
    type: state.auth.action_type,
    message: state.auth.action_message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signup: obj => {
      dispatch(signup(obj));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class SignupPage extends Component {
    constructor() {
      super();
      this.state = {
        email: "",
        password: "",
        passwordConf: "",
        country: "",
        fullName: "",
        message: "",
        isAdmin: undefined,
        showErrorElem: false
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          message: nextProps.message,
          type: nextProps.type
        });
      }
    }

    dismissError = () => {
      this.setState({ showErrorElem: false });
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.signup({
        email: this.state.email,
        password: this.state.password,
        passwordConf: this.state.passwordConf,
        isAdmin: this.state.isAdmin,
        fullName: this.state.fullName,
        country: this.state.country
      });
      window.scrollTo(0, 0);
      this.setState({ showErrorElem: true });
    };

    handleInputChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

    handleSelect = e => {
      this.setState({
        isAdmin: e.target.value === "admin" ? true : false
      });
    };

    render() {
      const { showErrorElem, message, type } = this.state;
      return (
        <div className="full center-wrapper">
          <div className="center">
            <div className="xs-12 t-c">
              <Link id="go-back" to="/">
                Home
              </Link>
            </div>

            <div className="auth xs-off-1 msm-off-2 sm-off-3 md-off-4 xs-10 msm-8 sm-6 md-4">
              {showErrorElem &&
                type === auth.SIGNUP_FAILED && (
                  <div className="message xs-12">
                    <div className="xs-1">
                      <button id="close" onClick={this.dismissError}>
                        X
                      </button>
                    </div>
                    <div className="xs-11">
                      <p> {message} </p>
                    </div>
                  </div>
                )}

              <form className="xs-12" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    placeholder="Email Address"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    autoComplete="foo"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    placeholder="Full Name"
                    type="text"
                    name="fullName"
                    value={this.state.fullName}
                    onChange={this.handleInputChange}
                    autoComplete="foo"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={this.state.country}
                    onChange={this.handleInputChange}
                    autoComplete="foo"
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    autoComplete="foo"
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <input
                    placeholder="Password Confirmation"
                    type="password"
                    name="passwordConf"
                    value={this.state.passwordConf}
                    autoComplete="foo"
                    onChange={this.handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <select
                    name="isAdmin"
                    id="role"
                    value={this.state.isAdmin ? "admin" : "user"}
                    onChange={this.handleSelect}
                    required
                  >
                    <option value="role" hidden>
                      Role
                    </option>

                    <option value="admin"> Admin </option>
                    <option value="user"> User </option>
                  </select>
                </div>

                <div className="form-group">
                  {this.props.type === auth.SIGNIN_IN_PROGRESS ? (
                    <button disabled id="submit">
                      Signing Up...
                    </button>
                  ) : (
                    <button
                      id="submit"
                      type="submit"
                      disabled={this.state.password !== this.state.passwordConf}
                    >
                      Sign Up
                    </button>
                  )}
                </div>
              </form>

              <div className="xs-12 info">
                <Link className="auth-link" to="/signin">
                  Have an account ? Sign In.
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
