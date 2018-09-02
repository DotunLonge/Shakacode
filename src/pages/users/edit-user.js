import React, { Component } from "react";
import "../../styles/home.css";
import { connect } from "react-redux";
import { authActions } from "../../redux-store/actions/auth";
import * as actionCreators from "../../redux-store/action-creators/admin";
import { bindActionCreators } from "redux";
import { getQueryString } from "../../helpers/others";
import { adminActions } from "../../redux-store/actions/admin";
import { Navigation } from "../../components/common";

const mapStateToProps = state => {
  return {
    user: state.admin.data.user,
    type: state.admin.action_type,
    message: state.admin.data.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class EditUserPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.match.params.id,
        email: "",
        password: "",
        passwordConf: "",
        country: "",
        fullName: "",
        message: "",
        isAdmin: undefined,
        showErrorElem: false
      };

      props.actions.fetchUser(
        props.match.params.id,
        getQueryString(window.location.href)
      );
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        if (nextProps.user) {
          delete nextProps.user.password;
        }
        this.setState({
          message: nextProps.message,
          type: nextProps.type,
          ...nextProps.user
        });
      }
    }

    dismissError = () => {
      this.setState({ showErrorElem: false });
    };

    handleSubmit = e => {
      e.preventDefault();

      this.props.actions.updateUser(
        {
          email: this.state.email,
          password: this.state.password,
          passwordConf: this.state.passwordConf,
          isAdmin: this.state.isAdmin,
          fullName: this.state.fullName,
          country: this.state.country
        },
        this.props.match.params.id
      );
      window.scrollTo(0, 0);
      this.setState({ showErrorElem: true });
    };

    handleInputChange = e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    };

    handleSelect = e => {
      let isAdmin = e.target.value === "admin" ? true : false;
      this.setState({
        isAdmin
      });
    };

    render() {
      const { showErrorElem, message, type } = this.state;

      return (
        <div className="full center-wrapper">
          <div className="center">
            <Navigation {...this.props} />
            <div className="auth xs-off-1 msm-off-2 sm-off-3 md-off-4 xs-10 msm-8 sm-6 md-4">
              {showErrorElem &&
                type !== adminActions.UPDATE_USER_IN_PROGRESS && (
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

              <div className="home">
                <h1>Edit User With ID: {this.state.id} </h1>

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
                    {this.props.type === authActions.UPDATE_IN_PROGRESS ? (
                      <button disabled id="submit">
                        Updating...
                      </button>
                    ) : (
                      <button
                        id="submit"
                        type="submit"
                        disabled={
                          this.state.password !== this.state.passwordConf
                        }
                      >
                        Update
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
