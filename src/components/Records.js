import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import {
  getRecords,
  deleteRecord,
  updateRecord,
  getCategories,
} from "../actions";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Records = ({
  getRecords,
  getCategories,
  records,
  categories,
  deleteRecord,
  updateRecord,
}) => {
  const [modal, setModal] = useState(false);
  const [modalD, setModalD] = useState(false);
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [udata, setUdata] = useState({
    title: "",
    amount: Number(),
    category_id: "",
  });

  if (modal || modalD) {
    window.addEventListener("click", () => {
      setModal(false);
      setModalD(false);
    });
  }

  useEffect(() => {
    getRecords();
    getCategories();
  }, [getRecords, getCategories]);

  const inputHandle = (e) => {
    const newData = { ...udata };
    newData[e.target.id] = e.target.value;
    setUdata(newData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateRecord(id, udata);
    setModal(false);
  };

  const renderRecords = records.data.map((record) => {
    return (
      <tr key={record.id}>
        <td>{record.title}</td>
        <td>
          {Intl.NumberFormat("az-AZ", {
            style: "currency",
            currency: "AZN",
          }).format(record.amount)}
        </td>
        <td>
          <span style={{ backgroundColor: record.category.color }}>
            {record.category.name}
          </span>
        </td>
        <td>
          {
            <React.Fragment>
              {new Date(record.updatedAt).toLocaleDateString()}{" "}
              {new Date(record.updatedAt).toLocaleTimeString("az-AZ", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </React.Fragment>
          }
        </td>
        <td>
          <i
            onClick={() => {
              setId(record.id);
              setModal(true);
              setUdata({
                title: record.title,
                amount: record.amount,
                category_id: record.category_id,
              });
              setTitle(record.title);
            }}
            className="fas fa-pen-square mr-2"
          ></i>
          <i
            onClick={() => {
              setModalD(true);
              setId(record.id);
              setUdata({
                title: record.title,
                amount: record.amount,
                category_id: record.category_id,
              });
              setTitle(record.title);
            }}
            className="fas fa-trash ml-2"
          ></i>
        </td>
      </tr>
    );
  });

  return (
    <>
      <div>
        <Navbar />
        <h1 className="categori-header">Records</h1>
        <div className="btn-container">
          <Link className="btn btn-primary" to="/newrecord">
            New record
          </Link>
        </div>
        <table onClick={(e) => e.stopPropagation()} className="table container">
          <thead>
            <tr>
              <th scope="col"> Title </th>
              <th scope="col"> Amount </th>
              <th scope="col"> Category </th>
              <th scope="col"> Last Update </th>
              <th scope="col"> Action </th>
            </tr>
          </thead>
          <tbody key={Math.random()}>{renderRecords}</tbody>
        </table>
      </div>

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
          <Modal.Title>Update: {title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                onChange={(e) => inputHandle(e)}
                defaultValue={udata.title}
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
                defaultValue={udata.amount}
                className="form-control"
                type="number"
                id="amount"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category_id">Category</label>
              <select
                onChange={(e) => inputHandle(e)}
                defaultValue={udata.category_id}
                className="form-control"
                id="category_id"
              >
                <option value={0}>Select A Category</option>
                {categories.data.map((category) => {
                  return <option value={category.id}>{category.name}</option>;
                })}
              </select>
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
            Delete: <b>{title}</b>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are You Sure You Want To Delete: <b>{udata.title}?</b>
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
              deleteRecord(id);
              setModalD(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapStatToProps = (state) => {
  return {
    categories: state.categories,
    records: state.records,
  };
};

export default connect(mapStatToProps, {
  getRecords,
  getCategories,
  deleteRecord,
  updateRecord,
})(Records);
