import React from "react";
import { connect } from "react-redux";
import { removeActivity } from "../../../../actions/activityActions";

import classes from "./ActivityItem.module.css";

const activityItem = ({ item, removeActivity }) => {
  const button = item.is_todo ? (
    <button
      type="button"
      className={classes.Undo}
      onClick={() => removeActivity(item)}
    >
      <i className="fas fa-undo" />
    </button>
  ) : (
    <button
      type="button"
      className={classes.Delete}
      onClick={() => removeActivity(item)}
    />
  );
  return (
    <li className={classes.ListItem}>
      <span className={classes.ItemTitle}>
        You earnt {item.total_xp} xp completing{" "}
        <span style={{ color: "#6e7790" }}>{item.goal_title}</span>
      </span>
      {button}
    </li>
  );
};

export default connect(
  null,
  { removeActivity }
)(activityItem);
