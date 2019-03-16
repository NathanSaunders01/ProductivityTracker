import {
  ADD_CATEGORY,
  SET_CATEGORIES,
  REMOVE_CATEGORY,
  UPDATE_CATEGORY_FOR_GOAL
} from "../actions/types";

const initialState = {
  categoryList: []
};

export default function(state = initialState, action) {
  let updatedCategories = [];
  switch (action.type) {
    case ADD_CATEGORY:
      updatedCategories = state.categoryList.concat(action.payload);
      return {
        ...state,
        categoryList: updatedCategories
      };
    case REMOVE_CATEGORY:
      updatedCategories = state.categoryList.filter(
        category => category.id !== action.payload
      );
      return {
        ...state,
        categoryList: updatedCategories
      };
    case SET_CATEGORIES:
      const { categoryList } = action.payload;
      return {
        ...state,
        categoryList: categoryList
      };
    default:
      return state;
  }
}
