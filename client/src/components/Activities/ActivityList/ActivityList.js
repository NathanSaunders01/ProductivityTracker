import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import classes from "./ActivityList.module.css";
import ActivityItem from "./ActivityItem/ActivityItem";

const activityList = ({ activityList, setRef }) => {
  const activityItems = activityList.map(item => (
    <CSSTransition key={item.id} timeout={500} classNames="move">
      <ActivityItem item={item} />
    </CSSTransition>
  ));

  const blankMessage =
    activityList.length > 0 ? null : (
      <CSSTransition timeout={500} classNames="move">
        <p>You have no activities yet!</p>
      </CSSTransition>
    );
  return (
    <TransitionGroup
      className={classes.List}
      style={{ paddingRight: activityList.length >= 7 ? "16px" : "0px" }}
    >
      {blankMessage}
      {activityItems}
    </TransitionGroup>
  );
};

export default activityList;
