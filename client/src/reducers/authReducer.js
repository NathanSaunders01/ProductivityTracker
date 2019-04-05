import {
  SET_CURRENT_USER,
  LOAD_USER,
  REGISTER_FAIL,
  LOGIN_FAIL,
  RESET_AUTH
} from "../actions/types";

const initialState = {
  isLoading: false,
  isRegistering: false,
  isLoggingIn: false,
  isAuthenticated: false,
  loginFail: false,
  registerFail: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        isLoggingIn: action.payload === "login",
        isRegistering: action.payload === "register",
        isLoading: action.payload === "load"
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated:
          action.payload &&
          action.payload.auth_token &&
          action.payload.auth_token.length > 0
            ? true
            : false,
        user: action.payload,
        isLoading: false,
        isRegistering: false,
        isLoggingIn: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginFail: true
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerFail: true
      };
    case RESET_AUTH:
      return {
        isLoading: false,
        isRegistering: false,
        isLoggingIn: false
      };
    default:
      return state;
  }
}
