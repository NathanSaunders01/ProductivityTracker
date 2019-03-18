import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import { removeGoal } from "../../../../actions/goalActions";
import { addActivity } from "../../../../actions/activityActions";

import classes from "./ToDoItem.module.css";
import Crown from "../../../../assets/images/logo_full_crown.png";

class ToDoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: "",
      minutes: "",
      hours: "",
      days: "",
      parentNode: null,
      thisNode: null,
      isVisible: true
    };
  }

  componentDidMount() {
    const { item } = this.props;

    let seconds = parseInt(`${item.time_left}`, 10);
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    let mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;

    this.setState(
      {
        seconds: seconds,
        minutes: mnts,
        hours: hrs,
        days: days,
        countDownDate: new Date().getTime() + parseInt(`${item.time_left}000`),
        parentNode: ReactDOM.findDOMNode(this).parentNode,
        thisNode: ReactDOM.findDOMNode(this)
      },
      () =>
        this.state.parentNode.addEventListener("scroll", () =>
          this.isInViewport(this.state.thisNode, this.state.parentNode)
        )
    );
    this.intervalId = setInterval(this.refreshTimer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.getTime();
  };

  refreshTimer = () => {
    const { countDownDate } = this.state;
    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now an the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Set state for item
    this.setState({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    });
  };

  isInViewport = (elem, parent) => {
    const boundingChild = elem.getBoundingClientRect();
    const boundingParent = parent.getBoundingClientRect();

    const isVisible =
      boundingChild.bottom > boundingParent.top + parent.clientHeight ||
      boundingChild.top < boundingParent.top;
    this.setState({
      isVisible: !isVisible
    });
  };

  render() {
    const { item, removeGoal, addActivity } = this.props;
    const { days, hours, minutes, seconds, isVisible } = this.state;
    const crownIcon = item.bonus_available ? (
      <img src={Crown} className={classes.Streak} alt={"Goal streak crown"} />
    ) : null;
    return (
      <li
        className={classes.ListItem}
        ref={this.myRef}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <span className={classes.Title}>
          {item.title}
          {crownIcon}
        </span>
        <div
          className={classes.Timer}
          style={{ color: days > 0 ? "black" : "red" }}
        >
          <span>{days > 0 ? `${days}d` : ""}</span>
          <span>{hours}h</span>
          <span>{minutes}m</span>
          <span>{seconds}s</span>
        </div>
        <span className={classes.Xp}>{item.xp_value} xp</span>
        <span className={classes.Actions}>
          <button
            type="button"
            className={classes.Complete}
            onClick={() =>
              addActivity({
                goal_id: item.id,
                quantity: 1,
                is_todo: item.is_recurring === 0
              })
            }
          />
          <button
            type="button"
            onClick={() => removeGoal(item)}
            className={classes.Delete}
          />
        </span>
      </li>
    );
  }
}

export default connect(
  null,
  { removeGoal, addActivity }
)(ToDoItem);
