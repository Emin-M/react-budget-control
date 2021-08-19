import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { getCategories, deleteCategory, updateCategory } from "../actions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Category = ({
  getCategories,
  categories,
  deleteCategory,
  updateCategory,
}) => {
  const [modal, setModal] = useState(false);
  const [id, setId] = useState();
  const [udata, setUdata] = useState({
    name: "",
    type: "",
    color: "",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const inputHandle = (e) => {
    const newData = { ...udata };
    newData[e.target.id] = e.target.value;
    console.log(newData);
    setUdata(newData);
  };

  const onSubmit = () => {
    updateCategory(id, udata);
    setModal(false);
  };

  const renderCategories = categories.data.map((category) => {
    return (
      <tr key={category.id}>
        <td>{category.name}</td>
        <td>
          <span style={{ backgroundColor: category.color }}>
            {category.type}
          </span>
        </td>
        <td>
          <i
            onClick={() => {
              setId(category.id);
              setModal(true);
              setUdata({
                name: category.name,
                type: category.type,
                color: category.color,
              });
            }}
            className="fas fa-pen-square mr-2"
          ></i>
          <i
            onClick={() => deleteCategory(category.id)}
            className="fas fa-trash ml-2"
          ></i>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Navbar />
      <div className="btn-container">
        <Link className="btn btn-primary" to="/newcategory">
          New category
        </Link>
      </div>
      <table className="table container">
        <thead>
          <tr>
            <th scope="col"> Name </th>
            <th scope="col"> Type </th>
            <th scope="col"> Action </th>
          </tr>
        </thead>
        <tbody>{renderCategories}</tbody>
      </table>
      <Modal
        className="modal-header"
        show={modal}
        onHide={() => setModal(false)}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update: {udata.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                onChange={(e) => inputHandle(e)}
                defaultValue={udata.name}
                placeholder="Name"
                type="text"
                className="form-control"
                id="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Example select</label>
              <select
                onChange={(e) => inputHandle(e)}
                defaultValue={udata.type}
                className="form-control"
                id="type"
              >
                <option>income</option>
                <option>expense</option>
              </select>
            </div>
            <div className="form-group">
              <input
                onChange={(e) => inputHandle(e)}
                defaultValue={udata.color}
                placeholder="green"
                className="form-control"
                type="text"
                id="color"
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            rel="noreferrer"
            variant="danger"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button rel="noreferrer" variant="primary" onClick={() => onSubmit()}>
            Change
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStatToProps = (state) => {
  return {
    categories: state.categories,
  };
};

export default connect(mapStatToProps, {
  getCategories,
  deleteCategory,
  updateCategory,
})(Category);