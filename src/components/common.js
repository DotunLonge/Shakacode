import React from "react";
import { Link } from "react-router-dom";

export const Navigation = ({ history }) => {
  return (
    <div className="xs-12 t-c">
      <Link className="auth-btn" to="/">
        Home
      </Link>

      <Link className="auth-btn" to="#" onClick={history.goBack}>
        Back
      </Link>
    </div>
  );
};
