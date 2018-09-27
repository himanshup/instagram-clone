import {
  CREATE_POST,
  GET_FEED,
  GET_POST,
  ADD_COMMENT,
  ADD_COMMENT_SINGLE,
  GET_COMMENT,
  LIKE_POST,
  DISLIKE_POST,
  DELETE_POST,
  DELETE_COMMENT,
  DELETE_COMMENT_SINGLE
} from "../constants/action-types";

const initialState = {
  posts: [],
  post: {},
  editError: "",
  deletePostMsg: "",
  comment: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return action.payload;
    case DELETE_POST:
      const newPostsDelete = state.posts.filter(
        item => item._id !== action.payload
      );
      return {
        posts: newPostsDelete
      };
    case GET_FEED:
      return {
        posts: action.payload
      };
    case GET_POST:
      return {
        post: action.payload
      };
    case ADD_COMMENT:
      const newPostsComment = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.comments = [...post.comments, action.payload.comment];
          return post;
        } else {
          return post;
        }
      });
      return {
        posts: newPostsComment
      };
    case ADD_COMMENT_SINGLE:
      return {
        post: action.payload
      };
    case GET_COMMENT:
      return {
        comment: action.payload
      };
    case DELETE_COMMENT:
      const newPostsDeleteComment = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.comments = post.comments.filter(
            item => item._id !== action.payload.commentId
          );
          return post;
        } else {
          return post;
        }
      });
      return {
        posts: newPostsDeleteComment
      };
    case DELETE_COMMENT_SINGLE:
      return {
        post: action.payload
      };
    case LIKE_POST:
      const newPostsLike = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.likes = [...post.likes, action.payload.like];
          return post;
        } else {
          return post;
        }
      });
      return {
        posts: newPostsLike
      };
    case DISLIKE_POST:
      const newPostsDislike = state.posts.map(post => {
        if (post._id === action.payload.postId) {
          post.likes = post.likes.filter(
            item => item._id !== action.payload.likeId
          );
          return post;
        } else {
          return post;
        }
      });
      return {
        posts: newPostsDislike
      };
    default:
      return state;
  }
}
