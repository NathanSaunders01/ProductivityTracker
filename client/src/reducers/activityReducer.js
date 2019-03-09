import {
  ADD_ACTIVITY,
  REMOVE_ACTIVITY,
  SET_ACTIVITIES
} from "../actions/types";

const initialState = {
  activityList: []
};

export default function(state = initialState, action) {
  let updatedActivities = [];
  switch (action.type) {
    case SET_ACTIVITIES:
      const { activityList } = action.payload;
      return {
        ...state,
        activityList: activityList
      };
    case ADD_ACTIVITY:
      return {
        ...state,
        activityList: [action.payload, ...state.activityList]
      };
    case REMOVE_ACTIVITY:
      updatedActivities = state.activityList.filter(
        item => item.id !== action.payload
      );
      return {
        ...state,
        activityList: updatedActivities
      };
    default:
      return state;
  }
}
