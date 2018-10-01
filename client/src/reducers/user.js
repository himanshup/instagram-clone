import {
  USER_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER
} from "../constants/action-types";

const initialState = {
  user: {},
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE:
      return {
        user: action.payload.user,
        posts: action.payload.posts
      };
    case FOLLOW_USER:
      const newStateFollow = state;
      return {
        ...newStateFollow,
        user: {
          ...newStateFollow.user,
          followers: [...newStateFollow.user.followers, action.payload]
        }
      };
    case UNFOLLOW_USER:
      return {
        user: action.payload,
        posts: state.posts
      };
    default:
      return state;
  }
}
