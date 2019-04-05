import { GET_ALERTS, CLEAR_ALERTS } from "../actions/types";

const initialState = {
  displayAlert: false,
  message: [],
  status: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALERTS:
      const { data, status } = action.payload;
      return {
        ...state,
        displayAlert: true,
        message: data,
        status: status
      };
    case CLEAR_ALERTS:
      return {
        ...state,
        displayAlert: false
      };
    default:
      return state;
  }
}
