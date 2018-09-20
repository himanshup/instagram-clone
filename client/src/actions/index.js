import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  RESET_MESSAGE,
  GET_PREVIEW,
  RESET_PREVIEW
} from "../constants/action-types";
import history from "../history";

export const loginUser = data => dispatch => {
  const { username, password } = data;

  axios
    .post("/api/login", {
      username: username,
      password: password
    })
    .then(response => {
      console.log("post req to login success");
      console.log(response.data);
      console.log(response.data.message);
      response.data.message
        ? dispatch({ type: LOGIN_USER, payload: response.data.message })
        : dispatch({ type: LOGIN_USER, payload: response.data });
      if (!response.data.message && response.data.id) {
        localStorage.setItem("Auth", JSON.stringify(response.data.id));
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const registerUser = data => dispatch => {
  console.log("printing from actions", data);
  const formData = new FormData();
  if (data.image) {
    formData.append("file", data.image[0]);
  }
  formData.append("username", data.username);
  formData.append("password", data.password);
  axios
    .post("/api/register", formData)
    .then(response => {
      console.log(response.data);
      response.data.error
        ? dispatch({ type: REGISTER_USER, payload: response.data.error })
        : dispatch({ type: REGISTER_USER, payload: response.data });
    })
    .catch(error => {
      console.log("error uploading image");
      console.log(error);
    });
};

export const logout = () => dispatch => {
  axios
    .post("/api/logout")
    .then(response => {
      console.log(response.data);
      localStorage.removeItem("Auth");
      history.push("/");
      dispatch({ type: LOGOUT_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error);
    });
};

export const resetMsg = () => dispatch => {
  dispatch({ type: RESET_MESSAGE, payload: "" });
};

export const getPreview = image => dispatch => {
  dispatch({ type: GET_PREVIEW, payload: image });
};

export const resetPreview = () => dispatch => {
  dispatch({ type: RESET_PREVIEW, payload: "" });
};
