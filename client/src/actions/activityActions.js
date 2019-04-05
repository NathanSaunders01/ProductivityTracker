import axios from "axios";
import {
  ADD_ACTIVITY,
  REMOVE_ACTIVITY,
  GET_ALERTS,
  REMOVE_TODO,
  ADD_TODO,
  UPDATE_GOAL,
  CLEAR_ALERTS
} from "./types";

export const addActivity = activityData => dispatch => {
  axios
    .post("/api/v1/activities", { activity: activityData })
    .then(res => {
      console.log(res);
      dispatch({
        type: ADD_ACTIVITY,
        payload: res.data.activity
      });
      if (activityData.is_todo) {
        dispatch({
          type: REMOVE_TODO,
          payload: res.data.goal.id
        });
      } else {
        dispatch({
          type: UPDATE_GOAL,
          payload: res.data.goal
        });
      }
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ALERTS,
        payload: err.response
      });
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERTS });
      }, 5000);
    });
};

export const removeActivity = activity => dispatch => {
  axios
    .delete(`/api/v1/activities/${activity.id}`)
    .then(res => {
      console.log(res.data);
      dispatch({
        type: REMOVE_ACTIVITY,
        payload: activity.id
      });
      if (activity.is_todo) {
        dispatch({
          type: ADD_TODO,
          payload: res.data
        });
      } else {
        dispatch({
          type: UPDATE_GOAL,
          payload: res.data
        });
      }
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: GET_ALERTS,
        payload: err.response
      });
      setTimeout(() => {
        dispatch({ type: CLEAR_ALERTS });
      }, 5000);
    });
};
