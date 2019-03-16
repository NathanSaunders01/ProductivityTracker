import axios from "axios";
import {
  ADD_CATEGORY,
  UPDATE_CATEGORY_FOR_GOAL,
  REMOVE_CATEGORY
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

// Remove category
export const removeCategory = categoryData => dispatch => {
  axios
    .delete(`/api/v1/categories/${categoryData.id}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: REMOVE_CATEGORY,
        payload: categoryData.id
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};
