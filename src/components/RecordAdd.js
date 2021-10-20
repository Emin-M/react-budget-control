import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { addRecord, getCategories } from "../actions";
import { toast } from "react-toastify";

const RecordAdd = ({ addRecord, getCategories, categories }) => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onSubmit = (data) => {
    addRecord(data);
    history.push("/records");
    toast.success("Record added successfully!", {
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
      <h1>Adding New Record</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            placeholder="Title"
            type="text"
            className="form-control"
            id="title"
            name="title"
            {...register("title", {
              required: "Title required",
            })}
          />
          {errors.title?.message}
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            className="form-control"
            placeholder="0"
            type="number"
            id="amount"
            name="amount"
            {...register("amount", {
              required: "Amount required",
            })}
          />
          {errors.amount?.message}
        </div>
        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select
            defaultValue="0"
            className="form-control"
            id="category_id"
            name="category_id"
            {...register("category_id", {
              required: "Category Id required",
            })}
          >
            {errors.category_id?.message}
            <option>Select A Category</option>
            {categories.data.map((category) => {
              return <option value={category.id}>{category.name}</option>;
            })}
          </select>
        </div>
        <button
          onClick={() => history.push("/records")}
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

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStateToProps, { addRecord, getCategories })(
  RecordAdd
);
