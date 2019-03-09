import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import ColumnGraph from "./ColumnGraph/ColumnGraph";
import classes from "./Analytics.module.css";

class Analytics extends Component {
  _isMounted = false;
  constructor() {
    super();

    this.state = {
      title: "",
      categories: [],
      series: [],
      type: ""
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    console.log("mounter");
    axios.post("/api/v1/get_chart_data", { period: "day" }).then(res => {
      console.log(res);
      const { title, categories, series } = res.data;

      if (this._isMounted) {
        this.setState({
          title: title,
          categories: categories,
          series: series,
          type: "column"
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.activityList);
    if (
      this.props.activityList.length > prevProps.activityList.length &&
      prevProps.activityList.length !== 0
    ) {
      console.log("hello there");
      // Update the last entry in array of data for
      // for the series with the same goal name as the new activity
      if (this.props.activityList.length > prevProps.activityList.length) {
        const newActivity = this.props.activityList.reduce((prev, current) =>
          prev.id > current.id ? prev : current
        );

        const dataSetIndex = this.state.series.findIndex(
          data => data.name === newActivity.goal_title
        );
        let updatedState = this.state.series;
        updatedState[dataSetIndex].data[
          updatedState[dataSetIndex].data.length - 1
        ] += newActivity.total_xp;

        this.setState({ type: "line" }, () =>
          this.setState({
            series: [...updatedState],
            type: "column"
          })
        );
      }
    } else if (this.props.activityList.length < prevProps.activityList.length) {
      const newIds = this.props.activityList.map(activity => activity.id);
      console.log(newIds);
      const oldIds = prevProps.activityList.map(activity => activity.id);
      console.log(oldIds);
      let removedId, removedActivity;
      oldIds.map(id => {
        if (!newIds.includes(id)) removedId = id;
      });

      console.log(removedId);
      removedActivity = removedId
        ? prevProps.activityList.filter(
            activity => activity.id === removedId
          )[0]
        : null;
      const dataSetIndex = this.state.series.findIndex(
        data => data.name === removedActivity.goal_title
      );
      let updatedState = this.state.series;
      updatedState[dataSetIndex].data[
        updatedState[dataSetIndex].data.length - 1
      ] -= removedActivity.total_xp;

      this.setState({ type: "line" }, () =>
        this.setState({
          series: [...updatedState],
          type: "column"
        })
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  switchChartsHandler = period => {
    if (this.state.title === `XP by ${period}`) return false;
    axios.post("/api/v1/get_chart_data", { period: period }).then(res => {
      console.log(res.data);
      const { title, categories, series } = res.data;
      this.setState({
        title: title,
        categories: categories,
        series: series
      });
    });
  };

  render() {
    const { title, categories, series, type } = this.state;
    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <h4>Analytics</h4>
        </div>
        <div className={classes.Content}>
          <ColumnGraph
            title={title}
            type={type}
            categories={categories}
            series={series}
          />
          <div className={classes.ChartSwitchBtns}>
            <button
              type="button"
              className={classes.BtnSwitch}
              onClick={() => this.switchChartsHandler("day")}
            >
              Daily
            </button>
            <button
              type="button"
              className={classes.BtnSwitch}
              onClick={() => this.switchChartsHandler("week")}
            >
              Weekly
            </button>
            <button
              type="button"
              className={classes.BtnSwitch}
              onClick={() => this.switchChartsHandler("month")}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Analytics.propTypes = {
  activityList: PropTypes.array.isRequired,
  goalList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activityList: state.activity.activityList,
  goalList: state.goal.goalList
});
export default connect(mapStateToProps)(Analytics);
