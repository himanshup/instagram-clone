import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  RESET_VALUE,
  GET_PREVIEW
} from "../constants/action-types";
import history from "../history";

axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.token}`;

export const loginUser = data => dispatch => {
  const { username, password } = data;

  axios
    .post("/api/auth/login", {
      username: username,
      password: password
    })
    .then(response => {
      if (response.data.message) {
        dispatch({ type: LOGIN_USER, payload: response.data.message });
      } else if (!response.data.message && response.data.token) {
        localStorage.setItem("Auth", JSON.stringify(response.data.userInfo));
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common["Authorization"] = `bearer ${
          response.data.token
        }`;
        dispatch({ type: LOGIN_USER, payload: response.data.userInfo });
        history.push("/posts");
      }
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: LOGIN_USER, payload: "error" });
    });
};

export const registerUser = data => dispatch => {
  const formData = new FormData();
  if (data.image) {
    formData.append("file", data.image[0]);
  }
  formData.append("username", data.username);
  formData.append("password", data.password);
  axios
    .post("/api/auth/register", formData)
    .then(response => {
      dispatch({ type: REGISTER_USER, payload: response.data });
      if (!response.data.error) {
        history.push("/");
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const logout = () => dispatch => {
  axios
    .post("/api/auth/logout")
    .then(response => {
      console.log(response);
      localStorage.removeItem("Auth");
      localStorage.removeItem("token");
      dispatch({ type: LOGOUT_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error);
    });
};

// for image preview
export const getPreview = images => dispatch => {
  if (images[1]) {
    return dispatch({
      type: GET_PREVIEW,
      payload: { message: "Only 1 image allowed" }
    });
  } else {
    dispatch({ type: GET_PREVIEW, payload: images[0].preview });
  }
};

// resets image preview
export const resetValue = () => dispatch => {
  dispatch({ type: RESET_VALUE, payload: "" });
};
