import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER
} from "../constants/action-types";

const initialState = {
  user: {},
  isAuth: false
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload) {
        return {
          user: action.payload,
          isAuth: true
        };
      } else {
        return {
          isAuth: false
        };
      }
    case REGISTER_USER:
      return action.payload;
    case LOGOUT_USER:
      return action.payload;
    default:
      return state;
  }
}
