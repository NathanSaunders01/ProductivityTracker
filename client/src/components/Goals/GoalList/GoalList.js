import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import GoalItem from "./GoalItem/GoalItem";
import classes from "./GoalList.module.css";

const goalList = ({ goalList, setRef }) => {
  const goalItems = goalList.map(item => (
    <CSSTransition key={item.id} timeout={500} classNames="move">
      <GoalItem item={item} />
    </CSSTransition>
  ));

  const blankMessage =
    goalList.length > 0 ? null : (
      <CSSTransition timeout={500} classNames="move">
        <p>You have no items on your goal list!</p>
      </CSSTransition>
    );
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
      <TransitionGroup
        className={classes.List}
        style={{ paddingRight: goalList.length >= 7 ? "16px" : "0px" }}
      >
        {blankMessage}
        {goalItems}
      </TransitionGroup>
    </div>
  );
};

export default goalList;
