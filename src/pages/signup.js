import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../redux-store/action-creators/auth";
import { authActions as auth } from "../redux-store/actions/auth";
import "../styles/auth.css";

class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      message: "",
      role: "",
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
      role: this.state.role
    });
    window.scrollTo(0, 0);
    this.setState({ showErrorElem: true });
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { showErrorElem, message } = this.state;
    return (
      <div className="full center-wrapper">
        <div className="center">
          <div className="xs-12 t-c">
            <Link id="go-back" to="/">
              Home
            </Link>
          </div>

          <div className="auth xs-off-1 msm-off-2 sm-off-3 md-off-4 xs-10 msm-8 sm-6 md-4">
            {showErrorElem && (
              <div className="message xs-12">
                <div className="xs-1">
                  <button id="close">X</button>
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
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  autoComplete="foo"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  autoComplete="foo"
                  onChange={this.handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  name="role"
                  id="role"
                  value={this.state.role}
                  onChange={this.handleInputChange}
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
                  <button id="submit" type="submit">
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
)(SignupPage);
