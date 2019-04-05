import { GET_ALERTS, CLEAR_ALERTS } from "./types";

export const clearAlerts = () => {
  return {
    type: CLEAR_ALERTS
  };
};

export const customAlerts = data => dispatch => {
  console.log(data);
  dispatch({
    type: GET_ALERTS,
    payload: data
  });
  setTimeout(() => {
    dispatch({ type: CLEAR_ALERTS });
  }, 5000);
};
