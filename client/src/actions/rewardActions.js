import axios from "axios";
import { ADD_REWARD, REMOVE_REWARD, FLIP_REWARDS } from "./types";

// Add reward
export const addReward = rewardData => dispatch => {
  axios
    .post("/api/v1/rewards", rewardData)
    .then(res => {
      console.log(res);
      dispatch({
        type: ADD_REWARD,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

// Remove reward
export const removeReward = rewardData => dispatch => {
  axios
    .delete(`/api/v1/rewards/${rewardData.id}`)
    .then(res => {
      console.log(res);
      dispatch({
        type: REMOVE_REWARD,
        payload: rewardData.id
      });
    })
    .catch(err => {
      console.log(err.response.data);
    });
};

// Flip all rewards
export const flipRewards = () => {
  return {
    type: FLIP_REWARDS,
    payload: { start: true }
  };
};

// const flipInterval = setInterval(flipRewards(), 200);
