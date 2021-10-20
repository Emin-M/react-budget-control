import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../actions";
import MainNavbar from "./MainNavbar";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = ({ login }) => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      history.push("/records");
      toast.success("Loged in successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.warn("Login failed!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div>
      <MainNavbar />
      <h1 className="signH">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container my-3">
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            aria-describedby="emailHelp"
            placeholder="User Name"
            {...register("username", {
              required: "Username required!",
            })}
          />
          <p>{errors.username?.message}</p>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && "Password must be at least 6 characters!"}
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default connect(null, { login })(Login);
