import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  RESET_VALUE
} from "../constants/action-types";

const initialState = {
  user: {},
  isAuth: false,
  loginMsg: "",
  registerMsg: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload.id) {
        return {
          user: action.payload,
          isAuth: true
        };
      } else {
        return {
          loginMsg: action.payload,
          isAuth: false
        };
      }
    case REGISTER_USER:
      return {
        registerMsg: action.payload
      };
    case LOGOUT_USER:
      return {
        isAuth: false
      };
    case RESET_VALUE:
      return {
        loginMsg: action.payload,
        registerMsg: action.payload
      };
    default:
      return state;
  }
}
