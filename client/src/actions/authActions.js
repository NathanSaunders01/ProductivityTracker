import axios from "axios";
import Auth from "../utils/Auth";
import setAuthToken from "../utils/setAuthToken";
import {
  LOAD_CURRENT_USER,
  SET_CURRENT_USER,
  GET_ERRORS,
  SET_GOALS,
  SET_ACTIVITIES,
  SET_CATEGORIES
} from "./types";

// Register User
export const registerUser = userData => dispatch => {
  axios
    .post("/api/v1/signup", { user: userData })
    .then(res => {
      console.log(res);
      // Save to local storage
      const { auth_token, email, first_name, last_name } = res.data;
      // Set token to local storage
      Auth.authenticateToken(auth_token);
      // Set token to Auth Header
      setAuthToken(auth_token);
      // Create user object
      const user = { auth_token, email, first_name, last_name };
      // Set current user
      dispatch(setCurrentUser(user));
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const loadCurrentUser = () => {
  return {
    type: LOAD_CURRENT_USER,
    payload: {}
  };
};

export const getCurrentUser = token => dispatch => {
  axios
    .post("/api/v1/get_user", { token: token })
    .then(res => {
      console.log(res);
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data.user
      });
      dispatch({
        type: SET_GOALS,
        payload: res.data
      });
      dispatch({
        type: SET_ACTIVITIES,
        payload: res.data
      });
      dispatch({
        type: SET_CATEGORIES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user and their goals
export const setCurrentUser = data => {
  return {
    type: SET_CURRENT_USER,
    payload: data
  };
};

// Login user
export const loginUser = userData => dispatch => {
  axios
    .post("/api/v1/login", { user: userData })
    .then(res => {
      console.log(res);
      // Save to local storage
      const { auth_token } = res.data.user;
      // Set token to local storage
      Auth.authenticateToken(auth_token);
      // Set token to Auth Header
      setAuthToken(auth_token);
      // Set current user
      dispatch({
        type: SET_CURRENT_USER,
        payload: res.data.user
      });
      // Set user's goals
      dispatch({
        type: SET_GOALS,
        payload: res.data
      });
      // Set user's activities
      dispatch({
        type: SET_ACTIVITIES,
        payload: res.data
      });
      // Set user's categories
      dispatch({
        type: SET_CATEGORIES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Logout user
export const logoutUser = () => dispatch => {
  axios
    .delete("/api/v1/logout")
    .then(res => {
      console.log(res);
      // Remove token from localStorage
      Auth.deauthenticateToken();
      // Remove auth header for future requests
      setAuthToken(false);
      // Set current user to {} which will set isAuthenticated to false
      dispatch(setCurrentUser({}));
      dispatch({
        type: SET_GOALS,
        payload: { goalList: [], todoList: [] }
      });
      dispatch({
        type: SET_CATEGORIES,
        payload: { categoryList: [] }
      });
      dispatch({
        type: SET_ACTIVITIES,
        payload: { activityList: [] }
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
