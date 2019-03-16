import axios from "axios";
import {
  ADD_GOAL,
  ADD_TODO,
  SET_GOALS,
  GET_ERRORS,
  REMOVE_GOAL,
  REMOVE_TODO,
  UPDATE_CATEGORY_FOR_GOAL,
  SET_CATEGORIES_FOR_GOAL
} from "./types";

// Add a recurring goal
export const addGoal = goalData => dispatch => {
  axios
    .post("/api/v1/goals", { goal: goalData })
    .then(res => {
      console.log(res);
      dispatch({
        type: ADD_GOAL,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Add a todo item
export const addTodo = todoData => dispatch => {
  axios
    .post("/api/v1/goals", { goal: todoData })
    .then(res => {
      console.log(res);
      dispatch({
        type: ADD_TODO,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Get user's goals and todo list
export const getGoals = () => dispatch => {
  axios
    .get("/api/v1/goals")
    .then(res => {
      console.log(res);
      dispatch({
        type: SET_GOALS,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Delete a goal
export const removeGoal = goal => dispatch => {
  axios
    .delete(`/api/v1/goals/${goal.id}`)
    .then(res => {
      console.log(res);
      console.log(goal.is_recurring);
      dispatch({
        type: goal.is_recurring === 1 ? REMOVE_GOAL : REMOVE_TODO,
        payload: goal.id
      });
    })
    .catch(err => {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// Set categories for goal
export const setCategoriesForGoal = goal => {
  return {
    type: SET_CATEGORIES_FOR_GOAL,
    payload: goal
  };
};

// Update category for goal
export const updateCategoryForGoal = data => dispatch => {
  const { goal, categoryId } = data;
  axios
    .patch(`/api/v1/goals/${goal.id}`, { category_id: categoryId, goal: goal })
    .then(res => {
      console.log(res);
      dispatch({
        type: UPDATE_CATEGORY_FOR_GOAL,
        payload: categoryId
      });
    })
    .catch(err => {
      console.log(err.response);
    });
};
