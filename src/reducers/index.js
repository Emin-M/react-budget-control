import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { categoryReducer } from "./categoryReducer";
import { recordReducer } from "./recordReducer";

export default combineReducers({
  user: loginReducer,
  categories: categoryReducer,
  records: recordReducer,
});
