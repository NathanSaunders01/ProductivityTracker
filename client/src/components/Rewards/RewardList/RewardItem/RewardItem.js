import React from "react";

import classes from "./RewardItem.module.css";
import fullCrown from "../../../../assets/images/logo_full_crown.png";
import ProgressBar from "../../../UI/ProgressBar/ProgressBar";
import RewardDetails from "./RewardDetails/RewardDetails";

const rewardItem = ({ item }) => {
  return (
    <div className={classes.Card}>
      <div
        className={[classes.CardSide, classes.CardSideFront].join(" ")}
        style={item.isFlipped ? { transform: "rotateY(-180deg)" } : {}}
      >
        <img
          className={classes.CardLogo}
          src={fullCrown}
          alt="Meritokracy Crown Logo"
        />
        <div className={classes.Progress}>
          <ProgressBar width={item.width} color="#efca00" />
        </div>
      </div>
      <div
        className={[classes.CardSide, classes.CardSideBack].join(" ")}
        style={item.isFlipped ? { transform: "rotateY(0)" } : {}}
      >
        <RewardDetails item={item} />
      </div>
    </div>
  );
};

export default rewardItem;
