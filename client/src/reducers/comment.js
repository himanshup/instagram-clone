import { ADD_COMMENT } from "../constants/action-types";

const initialState = {
  comments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return action.payload;
    default:
      return state;
  }
}
