import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ user }) => {
  const history = useHistory();
  const name = localStorage.getItem("userName");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/records">
              Records
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category">
              Category
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={() => logout()} className="nav-link btn">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="userName">
        <i className="fas fa-user-tie"></i>
        <span className="navbar-brand">
          {user.username ? user.username : name}
          {user.username || name ? "" : <Link to="/login">Login</Link>}
        </span>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Navbar);
