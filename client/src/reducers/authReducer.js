import { SET_CURRENT_USER, LOAD_CURRENT_USER } from "../actions/types";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
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
        isLoading: false
      };
    default:
      return state;
  }
}
