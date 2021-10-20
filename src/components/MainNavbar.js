import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const MainNavbar = () => {
  const { pathname } = useLocation();

  return (
    <div>
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
            <li
              className={pathname === "/login" ? "nav-item active" : "nav-item"}
            >
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
            <li
              className={
                pathname === "/register" ? "nav-item active" : "nav-item"
              }
            >
              <Link className="nav-link" to="/register">
                SignUp
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default MainNavbar;
