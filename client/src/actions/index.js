import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  RESET_VALUE,
  GET_PREVIEW,
  CREATE_POST,
  EDIT_POST,
  GET_FEED,
  USER_PROFILE,
  GET_POST,
  ADD_COMMENT,
  LIKE_POST,
  DISLIKE_POST,
  EDIT_POST_VALUES
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
      if (response.data.message) {
        dispatch({ type: LOGIN_USER, payload: response.data.message });
      } else if (!response.data.message && response.data.id) {
        localStorage.setItem("Auth", JSON.stringify(response.data));
        dispatch({ type: LOGIN_USER, payload: response.data });
      }
    })
    .catch(error => {
      console.log(error);
      dispatch({ type: LOGIN_USER, payload: error });
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
    .post("/api/register", formData)
    .then(response => {
      response.data.error
        ? dispatch({ type: REGISTER_USER, payload: response.data.error })
        : dispatch({ type: REGISTER_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error);
    });
};

export const logout = () => dispatch => {
  axios
    .post("/api/logout")
    .then(response => {
      localStorage.removeItem("Auth");
      dispatch({ type: LOGOUT_USER, payload: response.data });
      history.push("/");
    })
    .catch(error => {
      console.log(error);
    });
};

// for image preview
export const getPreview = image => dispatch => {
  dispatch({ type: GET_PREVIEW, payload: image });
};
// resets image preview
export const resetInput = () => dispatch => {
  dispatch({ type: RESET_VALUE, payload: "" });
};

export const getFeed = () => dispatch => {
  axios
    .get("/api/posts")
    .then(posts => {
      dispatch({ type: GET_FEED, payload: posts.data });
    })
    .catch(error => {
      console.log(error);
    });
};

export const createPost = data => dispatch => {
  const user = JSON.parse(localStorage.getItem("Auth"));
  const formData = new FormData();
  formData.append("file", data.image[0]);
  formData.append("caption", data.caption);
  formData.append("authorId", user.id);
  formData.append("username", user.username);
  formData.append("avatar", user.avatar);

  axios
    .post("/api/posts", formData)
    .then(post => {
      dispatch({ type: CREATE_POST, payload: post.data });
      history.push("/");
    })
    .catch(error => {
      console.log("error creating post");
      console.log(error);
    });
};

export const editPost = data => dispatch => {
  console.log(data);
  const user = JSON.parse(localStorage.getItem("Auth"));
  const formData = new FormData();
  formData.append("file", data.image[0]);
  formData.append("caption", data.caption);
  formData.append("authorId", user.id);
  formData.append("username", user.username);
  formData.append("avatar", user.avatar);
};

export const getPost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(post => {
      dispatch({ type: GET_POST, payload: post.data });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getEditFormValues = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(post => {
      dispatch({ type: EDIT_POST_VALUES, payload: post.data });
    })
    .catch(error => {
      console.log(error);
    });
};
export const likePost = id => dispatch => {
  axios
    .post(`/api/posts/${id}/likes`)
    .then(post => {
      dispatch({
        type: LIKE_POST,
        payload: post.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const dislikePost = (postId, likeId) => dispatch => {
  axios
    .delete(`/api/posts/${postId}/likes/${likeId}`)
    .then(post => {
      dispatch({
        type: DISLIKE_POST,
        payload: post.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getUserProfile = id => dispatch => {
  axios
    .get(`/api/users/${id}`)
    .then(user => {
      dispatch({ type: USER_PROFILE, payload: user.data });
    })
    .catch(error => {
      console.log(error);
    });
};

export const comment = (text, id) => dispatch => {
  axios
    .post(`/api/posts/${id}/comments`, {
      comment: text.comment
    })
    .then(response => {
      dispatch({
        type: ADD_COMMENT,
        payload: {
          postId: response.data.postId,
          comment: response.data.comment
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getUser = () => dispatch => {
  axios
    .get("/api/user")
    .then(response => {
      console.log(response.data);
      dispatch({ type: "GET_USERINFO", payload: response.data });
    })
    .catch(err => {
      console.log(err);
    });
};
