import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  RESET_VALUE
} from "../constants/action-types";

const initialState = {
  user: {},
  isAuth: false,
  redirectTo: "",
  loginError: "",
  registerError: "",
  registerSuccess: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload.id) {
        return {
          user: action.payload,
          isAuth: true,
          redirectTo: "/"
        };
      } else {
        return {
          loginError: action.payload,
          isAuth: false
        };
      }
    case REGISTER_USER:
      if (action.payload.error) {
        return {
          registerError: action.payload.error
        };
      } else {
        return {
          registerSuccess: action.payload.success
        };
      }
    case LOGOUT_USER:
      return {
        isAuth: false,
        redirectTo: "/"
      };
    case RESET_VALUE:
      return {
        loginError: action.payload,
        registerError: action.payload,
        registerSuccess: action.payload
      };
    default:
      return state;
  }
}
