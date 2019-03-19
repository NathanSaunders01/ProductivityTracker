import React from "react";

import RewardItem from "./RewardItem/RewardItem";
import classes from "./RewardList.module.css";

const rewardList = ({ rewardList }) => {
  const rewardItems = rewardList.map(item => (
    <RewardItem key={item.id} item={item} />
  ));
  return <div className={classes.List}>{rewardItems}</div>;
};

export default rewardList;
