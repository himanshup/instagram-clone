import {
  GET_PREVIEW,
  RESET_VALUE,
  CREATE_POST,
  GET_FEED,
  GET_POST,
  ADD_COMMENT,
  LIKE_POST
} from "../constants/action-types";

const initialState = {
  posts: [],
  post: {},
  prevew: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PREVIEW:
      return {
        preview: action.payload
      };
    case RESET_VALUE:
      return {
        preview: action.payload
      };
    case CREATE_POST:
      return action.payload;
    case GET_POST:
      return {
        post: action.payload
      };
    case GET_FEED:
      return {
        posts: action.payload
      };
    case ADD_COMMENT:
      const updatedPosts = state.posts.map(post => {
        if (post._id === action.payload._id) {
          post.comments = action.payload.comments.slice(0);
        }
        return post;
      });
      return {
        posts: updatedPosts
      };
    case LIKE_POST:
      const newPosts = state.posts.map(post => {
        if (post._id === action.payload._id) {
          post.likes = action.payload.likes.slice(0);
        }
        return post;
      });
      return {
        posts: newPosts
      };
    default:
      return state;
  }
}
