import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addActivity } from "../../../../actions/activityActions";
import { removeGoal } from "../../../../actions/goalActions";

import classes from "./GoalItem.module.css";

class GoalItem extends Component {
  constructor() {
    super();

    this.state = {
      item: null,
      showForm: false,
      activitiesLeft: 0,
      isOverHalfWay: false,
      percentage: 0
    };

    this.spanText = React.createRef();
    this.divWrapper = React.createRef();
  }

  componentDidMount() {
    const { item } = this.props;
    this.setState({
      item: item,
      activitiesLeft: item.frequency - item.week_activity_count,
      isOverHalfWay: item.week_activity_count > item.frequency / 2,
      percentage: (item.week_activity_count / item.frequency) * 100
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.item.week_activity_count !== this.props.item.week_activity_count
    ) {
      const { item } = this.props;
      this.setState({
        activitiesLeft: item.frequency - item.week_activity_count,
        isOverHalfWay: item.week_activity_count > item.frequency / 2,
        percentage: (item.week_activity_count / item.frequency) * 100
      });
    }
  }

  addActivityHandler = () => {
    const { item } = this.props;
    this.setState(
      prevState => {
        const newCount = (prevState.activitiesLeft -= 1);
        return {
          activitiesLeft: newCount,
          isOverHalfWay: item.frequency - newCount > item.frequency / 2,
          percentage: ((item.frequency - newCount) / item.frequency) * 100
        };
      },
      () =>
        this.props.addActivity({
          goal_id: item.id,
          quantity: 1,
          is_todo: item.is_recurring === 0
        })
    );
  };

  getSpanPercentage = () => {
    if (!this.spanText.current || !this.divWrapper.current) return 0;
    const spanTextWidth = this.spanText.current.offsetWidth;
    const divWrapperWidth = this.divWrapper.current.offsetWidth;
    const spanPercentage = (spanTextWidth / divWrapperWidth) * 100;
    return spanPercentage;
  };

  render() {
    const { item, removeGoal, addActivity } = this.props;
    const { activitiesLeft, isOverHalfWay, percentage } = this.state;
    const spanPercentage = this.getSpanPercentage();

    return (
      <li className={classes.ListItem}>
        <span className={classes.Title}>{item.title}</span>
        <div className={classes.Frequency} ref={this.divWrapper}>
          <span
            className={classes.FrequencyBar}
            style={{ width: `${percentage}%` }}
          />
          <span
            className={classes.FrequencyText}
            ref={this.spanText}
            style={{
              left: isOverHalfWay
                ? `${percentage - spanPercentage - 10}%`
                : `${percentage + 5}%`,
              color: isOverHalfWay ? "white" : "red"
            }}
          >
            {activitiesLeft} left
          </span>
        </div>
        <span className={classes.Xp}>{item.xp_value} xp</span>
        <span className={classes.Actions}>
          <button
            type="button"
            className={classes.Complete}
            onClick={() => this.addActivityHandler()}
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

GoalItem.propTypes = {
  addActivity: PropTypes.func.isRequired,
  removeGoal: PropTypes.func.isRequired
};

export default connect(
  null,
  { addActivity, removeGoal }
)(GoalItem);
