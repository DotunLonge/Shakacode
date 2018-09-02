import React, { Component } from "react";
import "../../styles/home.css";
import * as actionCreators from "../../redux-store/action-creators/admin";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getQueryString } from "../../helpers/others";
import { adminActions } from "../../redux-store/actions/admin";
import { Navigation } from "../../components/common";

const mapStateToProps = state => {
  return {
    users: state.admin.data.users,
    type: state.admin.action_type
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
  class ViewUsersPage extends Component {
    constructor(props) {
      super(props);
      this.props.actions.fetchUsers(getQueryString(window.location.href));

      this.state = {
        users: []
      };
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        this.setState({
          users: nextProps.users,
          type: nextProps.type
        });
      }
    }

    render() {
      let Users = null;
      const { users, type } = this.state;

      if (users && Boolean(users.length)) {
        Users = users.map((u, i) => {
          return (
            <tr key={i}>
              <td> {u.email}</td>
              <td> {u.isAdmin === true ? "Yes" : "No"}</td>
              <td> {u.createdAt} </td>
              <td> {u.updatedAt} </td>

              <td>
                <Link to={`/dashboard/users/${u._id}/delete`}>Delete</Link>
                <Link to={`/dashboard/users/${u._id}/edit`}>Edit</Link>
                <Link to={`/dashboard/users/${u._id}`}>View</Link>
              </td>
            </tr>
          );
        });
      }
      return (
        <div className="full center-wrapper">
          <div className=" t-c xs-12">
            <Navigation {...this.props} />
            <div className="home t-c xs-12">
              <h1>All Users</h1>

              {Users ? (
                <table>
                  <thead>
                    <tr>
                      <th> Email</th>
                      <th> isAdmin</th>
                      <th> Date Created</th>
                      <th> Date Updated</th>

                      <th> Actions </th>
                    </tr>
                  </thead>

                  <tbody>{Users}</tbody>
                </table>
              ) : type === adminActions.FETCH_USERS_IN_PROGRESS ? (
                <p>Fetching Users, Please Wait...</p>
              ) : (
                <p>Can't Seem To Fetch Any Users</p>
              )}
            </div>
          </div>
        </div>
      );
    }
  }
);
