import React from "react";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();
  const name = localStorage.getItem("userName");
  const { pathname } = useLocation();

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
        <ul className="navbar-nav">
          <li
            className={pathname === "/records" ? "nav-item active" : "nav-item"}
          >
            <Link className="nav-link" to="/records">
              Records
            </Link>
          </li>
          <li
            className={
              pathname === "/category" ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/category">
              Categories
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={() => logout()} className="nav-link btn logout">
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="userName">
        <i className="fas fa-user-tie"></i>
        <span className="navbar-brand">{name}</span>
      </div>
    </nav>
  );
};

export default connect()(Navbar);
