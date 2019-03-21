import { combineReducers } from "redux";
import authReducer from "./authReducer";
import goalReducer from "./goalReducer";
import activityReducer from "./activityReducer";
import categoryReducer from "./categoryReducer";
import rewardReducer from "./rewardReducer";

export default combineReducers({
  auth: authReducer,
  goal: goalReducer,
  activity: activityReducer,
  category: categoryReducer,
  reward: rewardReducer
});
