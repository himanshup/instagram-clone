import axios from "axios";
import { FETCH_USER, UPLOAD_IMAGE } from "../constants/action-types";

export const fetchUser = (username, password) => dispatch => {
  axios
    .post("/api/login", {
      username,
      password
    })
    .then(response => {
      console.log("login success");
      console.log(response.data);
      dispatch({ type: FETCH_USER, payload: response.data });
    })
    .catch(error => {
      console.log("login error");
      console.log(error);
    });
};

export const uploadImg = file => dispatch => {
  const data = new FormData();
  data.append("file", file);
  data.append("filename", file.name);

  axios
    .post("/api/post", data)
    .then(response => {
      console.log(response);
      dispatch({ type: UPLOAD_IMAGE, payload: response.data });
    })
    .catch(error => {
      console.log("error uploading image");
      console.log(error);
    });
};
