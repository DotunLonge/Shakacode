import React from "react";
import "../../styles/dashboard.css";
import { Link } from "react-router-dom";

const UserDashboardPage = ({ signout }) => {
  return (
    <div className="full">
      <div className="full center-wrapper">
        <div className="center t-c">
          <h1>Sorry, Users Don't Have Dashboards </h1>

          <Link to="/" className="auth-btn">
            HomePage
          </Link>

          <button className="auth-btn" onClick={signout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
