import {
  ADD_REWARD,
  SET_REWARDS,
  REMOVE_REWARD,
  FLIP_REWARDS
} from "../actions/types";

const initialState = {
  rewardList: []
};

export default function(state = initialState, action) {
  let updatedRewards = [];
  let updatedReward = null;
  let rewardList = [];
  switch (action.type) {
    case ADD_REWARD:
      updatedReward = {
        ...action.payload,
        width: 0,
        isFlipped: false
      };
      updatedRewards = state.rewardList.concat(action.payload);
      return {
        ...state,
        rewardList: updatedRewards
      };
    case REMOVE_REWARD:
      updatedRewards = state.rewardList.filter(
        category => category.id !== action.payload
      );
      return {
        ...state,
        rewardList: updatedRewards
      };
    case SET_REWARDS:
      ({ rewardList } = action.payload);
      return {
        ...state,
        rewardList: rewardList.map(reward => {
          return {
            ...reward,
            isFlipped: false,
            width: reward.id * 10
          };
        })
      };

    case FLIP_REWARDS:
      ({ rewardList } = state);
      return {
        ...state,
        rewardList: rewardList.map(reward => {
          return {
            ...reward,
            isFlipped: !reward.isFlipped
          };
        })
      };
    default:
      return state;
  }
}
