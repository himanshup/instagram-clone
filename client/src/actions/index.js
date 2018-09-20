import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER
} from "../constants/action-types";
import history from "../history";

export const loginUser = data => dispatch => {
  const { username, password } = data;

  axios
    .post("/api/login", {
      username: username.toLowerCase(),
      password: password
    })
    .then(response => {
      console.log("post req to login success");
      console.log(response.data);
      dispatch({ type: LOGIN_USER, payload: response.data });
      if (response.data.isAuth !== false) {
        localStorage.setItem("Auth", JSON.stringify(response.data.id));
        localStorage.setItem("Redirect", JSON.stringify("/"));
        history.push("/");
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
  formData.append("username", data.username.toLowerCase());
  formData.append("password", data.password);
  axios
    .post("/api/register", formData)
    .then(response => {
      console.log(response.data);
      dispatch({ type: REGISTER_USER, payload: response.data });
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
