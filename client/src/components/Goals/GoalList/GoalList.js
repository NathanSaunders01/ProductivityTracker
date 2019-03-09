import React from "react";

import GoalItem from "./GoalItem/GoalItem";
import classes from "./GoalList.module.css";

const goalList = ({ goalList, setRef }) => {
  const goalItems = goalList
    .map(item => <GoalItem item={item} key={item.id} />)
    .concat(<div key={"000"} ref={setRef} />);
  const blankMessage =
    goalList.length > 0 ? null : <p>You have no items on your goal list!</p>;
  const header =
    goalList.length > 0 ? (
      <div
        className={classes.Header}
        style={{ paddingRight: goalList.length > 7 ? "16px" : "0px" }}
      >
        <span className={classes.Title}>Title</span>
        <span className={classes.Frequency}>Frequency</span>
        <span className={classes.Xp}>XP</span>
        <span className={classes.Actions}>Actions</span>
      </div>
    ) : null;
  return (
    <div>
      {header}
      <ul
        className={classes.List}
        style={{ paddingRight: goalList.length > 7 ? "16px" : "0px" }}
      >
        {blankMessage}
        {goalItems}
      </ul>
    </div>
  );
};

export default goalList;
