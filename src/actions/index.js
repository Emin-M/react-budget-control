import api from "../api/api.js";

export const login = (values) => async (dispatch) => {
  const response = await api().post("/users/login", values);
  dispatch({ type: "LOGIN", payload: response.data });
  localStorage.setItem("token", response.data.token);
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
