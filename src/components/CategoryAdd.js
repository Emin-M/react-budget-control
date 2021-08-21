import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCategory } from "../actions";

const CategoryAdd = ({ addCategory }) => {
  const history = useHistory();

  const [data, setData] = useState({
    name: "",
    type: "expense",
    color: "black",
  });

  const inputHandle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    console.log(newData);
    setData(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addCategory(data);
    history.push("/category");
  };

  return (
    <div className="container my-5">
      <h1>Adding New Category</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            onChange={(e) => inputHandle(e)}
            value={data.name}
            placeholder="Name"
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <select
            onChange={(e) => inputHandle(e)}
            defaultValue={data.type}
            className="form-control"
            id="type"
          >
            <option>income</option>
            <option>expense</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            onChange={(e) => inputHandle(e)}
            placeholder="black/#99aa00"
            className="form-control"
            type="text"
            id="color"
          />
        </div>
        <button
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
