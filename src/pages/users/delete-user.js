import React, { Component } from "react";
import "../../styles/home.css";
import { connect } from "react-redux";
import * as actionCreators from "../../redux-store/action-creators/admin";
import { bindActionCreators } from "redux";
import { adminActions } from "../../redux-store/actions/admin";
import { Navigation } from "../../components/common";

const mapStateToProps = state => {
  return {
    user: state.admin.data.user,
    verifiedData: state.auth.data,
    message: state.admin.action_message || state.admin.data.message,
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
  class DeleteUserPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        id: props.match.params.id
      };

      if (props.match.params.id === props.verifiedData.id) {
        alert("You Cannot Delete Yourself");
        props.history.goBack();
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props !== nextProps) {
        if (this.state.id === nextProps.verifiedData.id) {
          alert("You Cannot Delete Yourself");
          nextProps.history.goBack();
        }

        this.setState({
          type: nextProps.type,
          message: nextProps.message
        });
      }
    }

    dismissError = () => {
      this.setState({ showErrorElem: false });
    };

    handleDelete = () => {
      this.props.actions.deleteUser(this.state.id);
      this.setState({ showErrorElem: true });
    };

    render() {
      const { showErrorElem, message, type } = this.state;

      return (
        <div className="full center-wrapper">
          <div className="center">
            <Navigation {...this.props} />
            <div className="home xs-12">
              <div className="xs-10 xs-off-1 sm-6 sm-off-3 md-4 md-off-4">
                {showErrorElem &&
                  type !== adminActions.DELETE_USER_IN_PROGRESS && (
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
              </div>

              <div className="xs-12">
                <h1>Delete User With ID :{this.state.id} </h1>
                <p> Are you sure you want to delete this user ?</p>
                <button
                  name="yes"
                  className="auth-btn"
                  onClick={this.handleDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);
