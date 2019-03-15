import React from "react";

import classes from "./ActivityList.module.css";
import ActivityItem from "./ActivityItem/ActivityItem";

const activityList = ({ activityList, setRef }) => {
  const activityItems = activityList
    .map(item => <ActivityItem item={item} key={item.id} />)
    .concat(<div key={"000"} ref={setRef} />);
  const blankMessage =
    activityList.length > 0 ? null : <p>You have no activities yet!</p>;
  return (
    <ul
      className={classes.List}
      style={{ paddingRight: activityList.length >= 7 ? "16px" : "0px" }}
    >
      {blankMessage}
      {activityItems}
    </ul>
  );
};

export default activityList;
