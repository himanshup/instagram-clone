import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import post from "./post";
import user from "./user";

export default combineReducers({
  auth,
  form: formReducer,
  post,
  user
});
