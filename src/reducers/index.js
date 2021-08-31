import { combineReducers } from "redux";
import { categoryReducer } from "./categoryReducer";
import { loginReducer } from "./loginReducer";

export default combineReducers({
  categories: categoryReducer,
  user: loginReducer,
});
