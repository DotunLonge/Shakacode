import React, { Component } from "react";
import "../../styles/home.css";
import * as adminActions from "../../redux-store/action-creators/admin";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getQueryString } from "../../helpers/others";
import { Navigation } from "../../components/common";

const mapStateToProps = state => {
  return {
    user: state.admin.data.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(adminActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  class ViewUserPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        user: {}
      };
      this.props.actions.fetchUser(
        this.props.match.params.id,
        getQueryString(window.location.href)
      );
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          user: nextProps.user
        });
      }
    }

    render() {
      const { user } = this.state,
        { id } = this.props.match.params;
      return (
        <div className="full center-wrapper">
          <div className="center t-c">
            <Navigation {...this.props} />
            <div className="home">
              <h1>User With ID: {id}</h1>
              <p>Full Name: {user.fullName}</p>

              <p>Email: {user.email}</p>

              <p>
                Country:
                {user.country}
              </p>

              <p>Is Admin ? {user.isAdmin === true ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      );
    }
  }
);
