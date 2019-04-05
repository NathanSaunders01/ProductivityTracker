import React from "react";
import { differenceInCalendarDays } from "date-fns";

import classes from "./RewardDetails.module.css";
import ProgressBar from "../../../../UI/ProgressBar/ProgressBar";

const rewardDetails = ({ item }) => {
  const daysLeft = () => {
    const dateToArray = item.date.split("/");
    const result = differenceInCalendarDays(
      new Date(dateToArray[2], dateToArray[1], dateToArray[0], 0, 0),
      new Date()
    );
    return result;
  };
  return (
    <div className={classes.Details}>
      <div className={classes.Header}>
        <p className={classes.Title}>{item.title}</p>
        <button type="button" className={classes.Delete} />
      </div>
      <div className={classes.BarContainer}>
        <div className={classes.BarWrapper}>
          <p className={classes.ProgressHeader}>Daily</p>
          <div className={classes.Progress}>
            <ProgressBar
              width={`${Math.floor(Math.random() * 76) + 24}`}
              color="#efca00"
            />
          </div>
        </div>
        <div className={classes.BarWrapper}>
          <p className={classes.ProgressHeader}>Weekly</p>
          <div className={classes.Progress}>
            <ProgressBar
              width={`${Math.floor(Math.random() * 76) + 24}`}
              color="#efca00"
            />
          </div>
        </div>
        <div className={classes.BarWrapper}>
          <p className={classes.ProgressHeader}>Monthly</p>
          <div className={classes.Progress}>
            <ProgressBar
              width={`${Math.floor(Math.random() * 76) + 24}`}
              color="#efca00"
            />
          </div>
        </div>
      </div>
      <div className={classes.BottomRow}>
        <div className={classes.XpCalc}>
          <span>{item.xp_target / item.id} xp</span> /{" "}
          <span>{item.xp_target} xp</span>
        </div>
        <p className={classes.DaysLeft}>{daysLeft()}d</p>
      </div>
    </div>
  );
};

export default rewardDetails;
