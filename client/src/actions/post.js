import axios from "axios";
import {
  RESET_VALUE,
  GET_PREVIEW,
  CREATE_POST,
  EDIT_POST,
  DELETE_POST,
  DELETE_SINGLE_POST,
  GET_FEED,
  GET_POST,
  LIKE_POST,
  DISLIKE_POST,
  SUBMIT_NEW_POST,
  LIKE_SINGLE_POST,
  DISLIKE_SINGLE_POST,
  GET_POST_FOR_EDIT,
  LOADING,
  SUBMIT_LOADING,
  POST_ERROR,
  SET_LOADING
} from "../constants/action-types";
import history from "../history";

axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.token}`;

export const getFeed = () => dispatch => {
  axios
    .get("/api/posts")
    .then(response => {
      const newPosts = [];
      for (const post of response.data.posts) {
        if (
          response.data.user.following.includes(post.author.id) ||
          post.author.id === response.data.user._id
        ) {
          newPosts.push(post);
        }
      }
      dispatch({ type: GET_FEED, payload: newPosts });
    })
    .then(response => {
      dispatch({ type: LOADING, payload: false });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getAllPosts = () => dispatch => {
  axios
    .get("/api/posts")
    .then(response => {
      dispatch({ type: GET_FEED, payload: response.data.posts });
    })
    .then(response => {
      dispatch({ type: LOADING, payload: false });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getPost = postId => dispatch => {
  axios
    .get(`/api/posts/${postId}`)
    .then(post => {
      if (post.data.error) {
        dispatch({ type: POST_ERROR, payload: post.data.error });
      } else {
        dispatch({ type: GET_POST, payload: post.data });
      }
    })
    .then(response => {
      dispatch({ type: LOADING, payload: false });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getPostForEdit = postId => dispatch => {
  axios
    .get(`/api/posts/${postId}/edit`)
    .then(post => {
      dispatch({ type: GET_POST_FOR_EDIT, payload: post.data });
    })
    .catch(error => {
      console.log(error);
    });
};

// hides new post form after submit to prevent user from spamming submit
export const submitNewPost = () => dispatch => {
  dispatch({ type: SUBMIT_NEW_POST, payload: true });
  dispatch({ type: SUBMIT_LOADING, payload: true });
};

export const createPost = data => dispatch => {
  const formData = new FormData();
  formData.append("file", data.image[0]);
  if (data.caption) {
    formData.append("caption", data.caption);
  }

  axios
    .post("/api/posts", formData)
    .then(post => {
      console.log(post.data);
      dispatch({ type: CREATE_POST, payload: post.data });
      history.push("/posts");
    })
    .catch(error => {
      console.log(error);
    });
};

export const editPost = (data, postId) => dispatch => {
  if (typeof data.image === "object" && data.image.length > 1) {
    return dispatch({
      type: EDIT_POST,
      payload: "Only 1 image allowed"
    });
  }
  const formData = new FormData();
  if (typeof data.image === "object") {
    formData.append("file", data.image[0]);
  }
  if (data.caption !== "" && data.caption !== undefined) {
    formData.append("caption", data.caption);
  }

  axios
    .put(`/api/posts/${postId}`, formData)
    .then(post => {
      dispatch({ type: EDIT_POST, payload: "Updated Post" });
      history.push(`/posts/${post.data._id}`);
    })
    .catch(error => {
      console.log(error);
    });
};

export const deletePost = (postId, singlePost) => dispatch => {
  axios
    .delete(`/api/posts/${postId}`)
    .then(response => {
      if (singlePost) {
        dispatch({
          type: DELETE_SINGLE_POST,
          payload: response
        });
      } else {
        dispatch({
          type: DELETE_POST,
          payload: postId
        });
      }
      history.push("/posts");
    })
    .catch(error => {
      console.log(error);
    });
};

export const likePost = (postId, singlePost) => dispatch => {
  axios
    .post(`/api/posts/${postId}/likes`)
    .then(response => {
      if (singlePost) {
        return dispatch({
          type: LIKE_SINGLE_POST,
          payload: response.data.like
        });
      } else {
        return dispatch({
          type: LIKE_POST,
          payload: { postId, like: response.data.like }
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const dislikePost = (postId, like, singlePost) => dispatch => {
  axios
    .delete(`/api/posts/${postId}/likes/${like._id}`)
    .then(post => {
      if (singlePost) {
        return dispatch({
          type: DISLIKE_SINGLE_POST,
          payload: like
        });
      } else {
        dispatch({
          type: DISLIKE_POST,
          payload: { postId, likeId: like._id }
        });
      }
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

export const setLoading = () => dispatch => {
  dispatch({ type: SET_LOADING, payload: true });
};
