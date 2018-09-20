import {
  GET_PREVIEW,
  RESET_VALUE,
  CREATE_POST,
  GET_FEED
} from "../constants/action-types";

const initialState = {
  posts: {},
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
    case GET_FEED:
      return {
        posts: action.payload
      };
    default:
      return state;
  }
}
