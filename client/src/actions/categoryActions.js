import axios from "axios";
import {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  REMOVE_CATEGORY_FROM_GOALS
} from "./types";

// Add category
export const addCategory = categoryData => dispatch => {
  axios
    .post("/api/v1/categories", categoryData)
    .then(res => {
      console.log(res);
      dispatch({
        type: ADD_CATEGORY,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

// Remove category from list and goals
export const removeCategory = categoryData => dispatch => {
  axios
    .delete(`/api/v1/categories/${categoryData.id}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: REMOVE_CATEGORY,
        payload: categoryData.id
      });
      dispatch({
        type: REMOVE_CATEGORY_FROM_GOALS,
        payload: categoryData.id
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};
