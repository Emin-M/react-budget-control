import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/api.js";
import MainNavbar from "./MainNavbar";

const SignUp = () => {
  const history = useHistory();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });

  const inputHandle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await api().post("/users/register", data);
    history.push("/login");
  };

  return (
    <div>
      <MainNavbar />
      <h1 className="signH">Sign Up</h1>
      <form onSubmit={(e) => onSubmit(e)} className="container my-3">
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            onChange={(e) => inputHandle(e)}
            value={data.username}
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            onChange={(e) => inputHandle(e)}
            value={data.email}
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => inputHandle(e)}
            value={data.password}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            onChange={(e) => inputHandle(e)}
            value={data.full_name}
            type="text"
            className="form-control"
            id="full_name"
            aria-describedby="emailHelp"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
