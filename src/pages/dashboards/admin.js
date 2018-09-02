import React, { Component } from "react";
import "../../styles/dashboard.css";
import { Link } from "react-router-dom";

class AdminDashboardPage extends Component {
  render() {
    return (
      <div className="full">
        <div className="full center-wrapper">
          <div className="center t-c">
            <h1>Admin Dashboard </h1>

            <Link to="/dashboard/users" className="auth-btn">
              See all users
            </Link>

            <button className="auth-btn" onClick={this.props.signout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminDashboardPage;
