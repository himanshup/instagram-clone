import {
  GET_PREVIEW,
  RESET_VALUE,
  CREATE_POST,
  GET_FEED,
  GET_POST,
  ADD_COMMENT,
  LIKE_POST,
  DISLIKE_POST,
  EDIT_POST_VALUES
} from "../constants/action-types";

const initialState = {
  posts: [],
  post: {},
  prevew: "",
  editData: {}
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
    case EDIT_POST_VALUES:
      return {
        editData: action.payload
      };
    case GET_FEED:
      return {
        posts: action.payload
      };
    case ADD_COMMENT:
      const newPostsComment = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.comments.push(action.payload.comment);
        }
        return post;
      });
      return {
        posts: newPostsComment
      };
    case LIKE_POST:
      const newPostsLike = state.posts.map(post => {
        if (post._id === action.payload._id) {
          post.likes = action.payload.likes.slice(0);
        }
        return post;
      });
      return {
        posts: newPostsLike
      };
    case DISLIKE_POST:
      const newPostsDislike = state.posts.map(post => {
        if (post._id === action.payload._id) {
          post.likes = action.payload.likes.slice(0);
        }
        return post;
      });
      return {
        posts: newPostsDislike
      };
    default:
      return state;
  }
}
