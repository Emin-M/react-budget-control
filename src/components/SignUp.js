import React from "react";
import { useHistory } from "react-router-dom";
import api from "../api/api.js";
import MainNavbar from "./MainNavbar";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const SignUp = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await api().post("/users/register", data);
      history.push("/login");
    } catch (error) {
      toast.error(`${error.response.data.errorMessage}`, {
        position: "top-center",
        autoClose: 5000,
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
      <h1 className="signH">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="container my-3">
        <div className="form-group">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            className="form-control"
            id="username"
            aria-describedby="emailHelp"
            placeholder="UserName"
            {...register("username", {
              required: "Username required!",
            })}
          />
          {errors.username?.message}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Email"
            {...register("email", {
              required: "Email required!",
            })}
          />
          {errors.email?.message}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && "Pasword must be at least 6 characters!"}
        </div>
        <div className="form-group">
          <label htmlFor="full_name">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            aria-describedby="emailHelp"
            placeholder="Full Name"
            {...register("full_name", {
              required: "Full Name required",
            })}
          />
          {errors.full_name?.message}
        </div>
        <button type="submit" className="btn btn-primary">
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
