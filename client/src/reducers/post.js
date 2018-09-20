import { GET_PREVIEW, RESET_PREVIEW } from "../constants/action-types";

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
    case RESET_PREVIEW:
      return {
        preview: action.payload
      };
    default:
      return state;
  }
}
