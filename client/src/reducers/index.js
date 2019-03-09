import { combineReducers } from "redux";
import authReducer from "./authReducer";
import goalReducer from "./goalReducer";
import activityReducer from "./activityReducer";

export default combineReducers({
  auth: authReducer,
  goal: goalReducer,
  activity: activityReducer
});