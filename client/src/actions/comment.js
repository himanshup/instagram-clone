import axios from "axios";
import { reset } from "redux-form";
import {
  RESET_VALUE,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  ADD_COMMENT_SINGLE_POST,
  DELETE_COMMENT_SINGLE_POST,
  GET_COMMENT,
  CHECK_IF_FOLLOWING,
  COMMENT_ERROR
} from "../constants/action-types";
import history from "../history";

axios.defaults.headers.common["Authorization"] = `bearer ${localStorage.token}`;

// resets image preview
export const resetValue = () => dispatch => {
  dispatch({ type: RESET_VALUE, payload: "" });
};

export const addComment = (text, postId, singlePost) => dispatch => {
  axios
    .post(`/api/posts/${postId}/comments`, {
      comment: text.comment
    })
    .then(response => {
      // checks if function was called from a single post page instead of the feed
      if (singlePost) {
        dispatch(reset(postId));
        return dispatch({
          type: ADD_COMMENT_SINGLE_POST,
          payload: response.data.comment
        });
      } else {
        dispatch(reset(postId));
        return dispatch({
          type: ADD_COMMENT,
          payload: {
            postId: response.data.postId,
            comment: response.data.comment
          }
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const getComment = (postId, commentId) => dispatch => {
  axios
    .get(`/api/posts/${postId}/comments/${commentId}/edit`)
    .then(comment => {
      console.log(comment);
      if (comment.data.error) {
        dispatch({ type: COMMENT_ERROR, payload: comment.data.error });
      } else {
        dispatch({ type: GET_COMMENT, payload: comment.data });
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const editComment = (postId, commentId, text) => dispatch => {
  axios
    .put(`/api/posts/${postId}/comments/${commentId}`, { comment: text })
    .then(response => {
      dispatch({ type: EDIT_COMMENT, payload: response.data.message });
      history.push(`/posts/${postId}`);
    })
    .catch(error => {
      console.log(error);
    });
};

export const deleteComment = (postId, comment, singlePost) => dispatch => {
  axios
    .delete(`/api/posts/${postId}/comments/${comment._id}`)
    .then(response => {
      if (singlePost) {
        dispatch({
          type: DELETE_COMMENT_SINGLE_POST,
          payload: comment
        });
      } else {
        dispatch({
          type: DELETE_COMMENT,
          payload: { postId, commentId: comment._id }
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
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
