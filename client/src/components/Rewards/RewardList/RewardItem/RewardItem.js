import React from "react";

import classes from "./RewardItem.module.css";
import fullCrown from "../../../../assets/images/logo_full_crown.png";
import ProgressBar from "../../../UI/ProgressBar/ProgressBar";

const rewardItem = ({ item }) => {
  return (
    <div>
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
            <ProgressBar width={item.width} index={item.id} />
          </div>
        </div>
        <div
          className={[classes.CardSide, classes.CardSideBack].join(" ")}
          style={item.isFlipped ? { transform: "rotateY(0)" } : {}}
        >
          {item.title}
        </div>
      </div>
    </div>
  );
};

export default rewardItem;
