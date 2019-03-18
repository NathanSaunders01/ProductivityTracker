import {
  ADD_GOAL,
  ADD_TODO,
  SET_GOALS,
  REMOVE_GOAL,
  REMOVE_TODO,
  UPDATE_GOAL,
  UPDATE_CATEGORY_FOR_GOAL,
  SET_CATEGORIES_FOR_GOAL,
  REMOVE_CATEGORY_FROM_GOALS
} from "../actions/types";

const initialState = {
  todoList: [],
  goalList: [],
  goalToCategorise: {},
  displayCategories: false
};

export default function(state = initialState, action) {
  let updatedTodos = [];
  let updatedGoals = [];
  let goalIndex = null;
  let categoryId;
  switch (action.type) {
    case ADD_GOAL:
      updatedGoals = state.goalList.concat(action.payload);
      return {
        ...state,
        goalList: updatedGoals
      };
    case ADD_TODO:
      updatedTodos = state.todoList.concat(action.payload);
      return {
        ...state,
        todoList: updatedTodos
      };
    case UPDATE_GOAL:
      updatedGoals = state.goalList;
      goalIndex = updatedGoals.findIndex(goal => goal.id === action.payload.id);
      updatedGoals[goalIndex] = action.payload;
      return {
        ...state,
        goalList: [...updatedGoals]
      };
    case SET_GOALS:
      const { goalList, todoList } = action.payload;
      return {
        ...state,
        todoList: todoList,
        goalList: goalList
      };
    case REMOVE_TODO:
      updatedTodos = state.todoList.filter(item => item.id !== action.payload);
      return {
        ...state,
        todoList: updatedTodos
      };
    case REMOVE_GOAL:
      updatedGoals = state.goalList.filter(item => item.id !== action.payload);
      return {
        ...state,
        goalList: updatedGoals
      };
    case SET_CATEGORIES_FOR_GOAL:
      return {
        ...state,
        goalToCategorise: action.payload,
        displayCategories:
          action.payload.title && action.payload.title.length > 0 ? true : false
      };
    case UPDATE_CATEGORY_FOR_GOAL:
      categoryId = action.payload;
      let tempGoal = state.goalToCategorise;
      if (state.goalToCategorise.categories.includes(categoryId)) {
        tempGoal.categories = state.goalToCategorise.categories.filter(
          cat => cat !== categoryId
        );
      } else {
        tempGoal.categories = state.goalToCategorise.categories.concat(
          categoryId
        );
      }
      updatedGoals =
        tempGoal.is_recurring === 0 ? state.todoList : state.goalList;
      goalIndex = updatedGoals.findIndex(goal => goal.id === tempGoal.id);
      updatedGoals[goalIndex] = { ...tempGoal };
      if (tempGoal.is_recurring === 0) {
        return {
          ...state,
          todoList: [...updatedGoals],
          goalToCategorise: { ...tempGoal }
        };
      } else {
        return {
          ...state,
          goalList: [...updatedGoals],
          goalToCategorise: { ...tempGoal }
        };
      }
    case REMOVE_CATEGORY_FROM_GOALS:
      categoryId = action.payload;
      let tmpGoals = state.goalList.map(goal => {
        return {
          ...goal,
          categories: goal.categories.filter(cat => cat !== categoryId)
        };
      });
      let currentGoal = {
        ...state.goalToCategorise,
        categories: state.goalToCategorise.categories.filter(
          cat => cat !== categoryId
        )
      };
      return {
        ...state,
        goalList: [...tmpGoals],
        goalToCategorise: { ...currentGoal }
      };
    default:
      return state;
  }
}
