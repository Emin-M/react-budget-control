import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../actions";

const Login = ({ login }) => {
  const history = useHistory();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const inputHandle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    login(data);
    history.push("/records");
  };

  return (
    <div>
      <h1 className="signH">Login</h1>
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
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => inputHandle(e)}
            value={data.password}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { login })(Login);
