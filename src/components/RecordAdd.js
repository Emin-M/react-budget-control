import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { addRecord, getCategories } from "../actions";

const RecordAdd = ({ addRecord, getCategories, categories }) => {
  const history = useHistory();

  useEffect(() => {
    getCategories();
  }, []);

  const [data, setData] = useState({
    title: "",
    amount: Number(),
    category_id: "",
  });

  const inputHandle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addRecord(data);
    history.push("/records");
  };
  return (
    <div className="container my-5">
      <h1>Adding New Record</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            onChange={(e) => inputHandle(e)}
            value={data.title}
            placeholder="Title"
            type="text"
            className="form-control"
            id="title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            onChange={(e) => inputHandle(e)}
            className="form-control"
            placeholder="0"
            type="number"
            id="amount"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category_id">Category</label>
          <select
            onChange={(e) => inputHandle(e)}
            className="form-control"
            id="category_id"
          >
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
