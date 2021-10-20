import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Navbar from "./Navbar";
import { getCategories, deleteCategory, updateCategory } from "../actions";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Categories = ({
  getCategories,
  categories,
  deleteCategory,
  updateCategory,
}) => {
  const [modal, setModal] = useState(false);
  const [modalD, setModalD] = useState(false);
  const [id, setId] = useState();
  const [header, setHeader] = useState();
  const [udata, setUdata] = useState({
    name: "",
    type: "",
    color: "",
  });

  if (modal || modalD) {
    window.addEventListener("click", () => {
      setModal(false);
      setModalD(false);
    });
  }

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const inputHandle = (e) => {
    const newData = { ...udata };
    newData[e.target.id] = e.target.value;
    setUdata(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
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
              setHeader(category.name);
            }}
            className="fas fa-pen-square mr-2"
          ></i>
          <i
            onClick={() => {
              setModalD(true);
              setId(category.id);
              setUdata({
                name: category.name,
                type: category.type,
                color: category.color,
              });
              setHeader(category.name);
            }}
            className="fas fa-trash ml-2"
          ></i>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <Navbar />
      <h1 className="categori-header">Categories</h1>
      <div className="btn-container">
        <Link className="btn btn-primary" to="/newcategory">
          New category
        </Link>
      </div>
      <table onClick={(e) => e.stopPropagation()} className="table container">
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
        onClick={(e) => e.stopPropagation()}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Update: {header}</Modal.Title>
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
              <label htmlFor="type">Type</label>
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
              <label htmlFor="color">Color</label>
              <input
                onChange={(e) => inputHandle(e)}
                defaultValue={udata.color}
                className="form-control"
                type="color"
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
          <Button
            rel="noreferrer"
            variant="primary"
            onClick={(e) => onSubmit(e)}
          >
            Change
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="modal-header"
        show={modalD}
        onHide={() => setModalD(false)}
        onClick={(e) => e.stopPropagation()}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Delete: <b>{header}</b>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are You Sure You Want To Delete: <b>{udata.name}?</b>
        </Modal.Body>

        <Modal.Footer>
          <Button
            rel="noreferrer"
            variant="danger"
            onClick={() => setModalD(false)}
          >
            Cancel
          </Button>
          <Button
            rel="noreferrer"
            variant="primary"
            onClick={() => {
              deleteCategory(id);
              setModalD(false);
            }}
          >
            Delete
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
})(Categories);
