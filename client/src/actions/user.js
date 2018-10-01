import axios from "axios";
import {
  USER_PROFILE,
  RESET_VALUE,
  GET_PREVIEW,
  FOLLOW_USER,
  UNFOLLOW_USER,
  HOVER_POST,
  UNHOVER_POST,
  CHECK_IF_FOLLOWING,
  EDIT_PROFILE,
  LOADING
} from "../constants/action-types";
import history from "../history";

axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.token}`;

export const editProfile = (data, userId) => dispatch => {
  if (typeof data.avatar === "object" && data.avatar.length > 1) {
    return dispatch({
      type: EDIT_PROFILE,
      payload: "only 1 image allowed"
    });
  }
  const formData = new FormData();
  if (typeof data.avatar === "object") {
    formData.append("file", data.avatar[0]);
  }
  if (data.name !== "" && data.name !== undefined) {
    formData.append("name", data.name);
  }
  if (data.bio !== "" && data.bio !== undefined) {
    formData.append("bio", data.bio);
  }

  axios
    .put(`/api/users/${userId}`, formData)
    .then(response => {
      dispatch({ type: EDIT_PROFILE, payload: response.data.message });
      history.push(`/users/${userId}`);
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

export const getUserProfile = id => dispatch => {
  axios
    .get(`/api/users/${id}`)
    .then(response => {
      dispatch({
        type: USER_PROFILE,
        payload: { posts: response.data.posts, user: response.data.user }
      });
    })
    .then(response => {
      dispatch({ type: LOADING, payload: false });
    })
    .catch(error => {
      console.log(error);
    });
};

export const followUser = userId => dispatch => {
  axios
    .post(`/api/users/follow/${userId}`)
    .then(response => {
      dispatch({ type: FOLLOW_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error);
    });
};

export const unfollowUser = userId => dispatch => {
  axios
    .delete(`/api/users/follow/${userId}`)
    .then(response => {
      dispatch({ type: UNFOLLOW_USER, payload: response.data });
    })
    .catch(error => {
      console.log(error);
    });
};

export const hoverPost = postId => dispatch => {
  dispatch({ type: HOVER_POST, payload: postId });
};

export const unhoverPost = () => dispatch => {
  dispatch({ type: UNHOVER_POST, payload: null });
};

export const getFollowing = id => dispatch => {
  const user = JSON.parse(localStorage.getItem("Auth"));
  axios
    .get(`/api/users/${user.id}`)
    .then(response => {
      dispatch({
        type: CHECK_IF_FOLLOWING,
        payload: response.data.user.following
      });
    })
    .catch(error => {
      console.log(error);
    });
};
