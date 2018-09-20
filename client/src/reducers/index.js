import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import post from "./post";

export default combineReducers({
  auth,
  form: formReducer,
  post
});
