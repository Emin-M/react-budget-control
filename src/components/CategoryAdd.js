import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCategory } from "../actions";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const CategoryAdd = ({ addCategory }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    addCategory(data);
    history.push("/category");
    toast.success("Category added successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <div className="container my-5">
      <h1>Adding New Category</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            placeholder="Name"
            type="text"
            className="form-control"
            id="name"
            name="name"
            {...register("name", {
              required: "Name required!",
            })}
          />
          {errors.name?.message}
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            className="form-control"
            id="type"
            name="type"
            {...register("type", {
              required: "Category type required!",
            })}
          >
            {errors.type?.message}
            <option>income</option>
            <option>expense</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            className="form-control"
            type="color"
            id="color"
            name="color"
            {...register("color", {
              required: "Color required!",
            })}
          />
          {errors.color?.message}
        </div>
        <button
          type="submit"
          onClick={() => history.push("/category")}
          className="btn btn-danger mx-3"
        >
          Back
        </button>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
};

export default connect(null, { addCategory })(CategoryAdd);
