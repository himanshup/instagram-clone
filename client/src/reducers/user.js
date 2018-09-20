import { USER_PROFILE } from "../constants/action-types";

const initialState = {
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE:
      return {
        user: action.payload
      };
    default:
      return state;
  }
}
