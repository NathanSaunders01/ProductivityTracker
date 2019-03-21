import {
  SET_CURRENT_USER,
  LOAD_CURRENT_USER,
  LOAD_REGISTER_USER,
  LOAD_LOGIN_USER
} from "../actions/types";

const initialState = {
  isLoading: false,
  isRegistering: false,
  isLoggingIn: false,
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LOGIN_USER:
      return {
        ...state,
        isLoggingIn: true
      };
    case LOAD_REGISTER_USER:
      return {
        ...state,
        isRegistering: true
      };
    case LOAD_CURRENT_USER:
      return {
        ...state,
        isLoading: true
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
    default:
      return state;
  }
}
