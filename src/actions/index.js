import api from "../api/api.js";

export const login = (values) => async (dispatch) => {
  const response = await api().post("/users/login", values);
  dispatch({ type: "LOGIN", payload: response.data });
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("userName", response.data.username);
};

export const getCategories = () => async (dispatch) => {
  const response = await api().get("/categories");
  dispatch({ type: "GET_CATEGORIES", payload: response.data });
};

export const addCategory = (formValues) => async (dispatch) => {
  const response = await api().post("/categories", formValues);
  dispatch({ type: "ADD_CATEGORY", payload: response.data });
};

export const updateCategory = (id, formValues) => async (dispatch) => {
  const response = await api().put(`/categories/${id}`, formValues);
  dispatch({ type: "UPDATE_CATEGORY", payload: response.data });
};

export const deleteCategory = (id) => async (dispatch) => {
  await api().delete(`/categories/${id}`);
  dispatch({ type: "DELETE_CATEGORY", payload: id });
};

export const getRecords = () => async (dispatch) => {
  const response = await api().get("/records");
  dispatch({ type: "GET_RECORDS", payload: response.data });
};

export const addRecord = (formValues) => async (dispatch) => {
  const response = await api().post("/records", formValues);
  dispatch({ type: "ADD_RECORD", payload: response.data });
};

export const updateRecord = (id, formValues) => async (dispatch) => {
  const response = await api().put(`/records/${id}`, formValues);
  dispatch({ type: "UPDATE_RECORD", payload: response.data });
};

export const deleteRecord = (id) => async (dispatch) => {
  await api().delete(`/records/${id}`);
  dispatch({ type: "DELETE_RECORD", payload: id });
};
