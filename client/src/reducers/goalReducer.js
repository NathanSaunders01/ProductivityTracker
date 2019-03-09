import {
  ADD_GOAL,
  ADD_TODO,
  SET_GOALS,
  REMOVE_GOAL,
  REMOVE_TODO,
  UPDATE_GOAL
} from "../actions/types";

const initialState = {
  todoList: [],
  goalList: []
};

export default function(state = initialState, action) {
  let updatedTodos = [];
  let updatedGoals = [];
  let goalIndex = null;
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
    default:
      return state;
  }
}
