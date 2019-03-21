import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  addWeeks,
  addDays,
  startOfMonth,
  endOfMonth,
  addMonths
} from "date-fns";

import ColumnGraph from "./ColumnGraph/ColumnGraph";
import GraphButton from "../UI/GraphSettings/GraphButton";
import classes from "./Analytics.module.css";

class Analytics extends Component {
  _isMounted = false;
  constructor() {
    super();

    this.state = {
      title: "",
      categories: [],
      series: [],
      type: "",
      periodSelected: "day",
      dataSelected: "all",
      displayMenu: false,
      options: [
        {
          id: 1,
          title: "Data",
          meta: "data",
          isActive: false,
          subOptions: [
            { id: 1, title: "All", meta: "all", isActive: true },
            { id: 2, title: "Goals", meta: "goal", isActive: false },
            { id: 3, title: "To-Dos", meta: "to-do", isActive: false },
            { id: 4, title: "Categories", meta: "category", isActive: false }
          ]
        },
        {
          id: 2,
          title: "Period",
          meta: "period",
          isActive: false,
          subOptions: [
            { id: 1, title: "Daily", meta: "day", isActive: true },
            { id: 2, title: "Weekly", meta: "week", isActive: false },
            { id: 3, title: "Monthly", meta: "month", isActive: false }
          ]
        }
      ]
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    axios
      .post("/api/v1/get_chart_data", { period: "day", dataType: "all" })
      .then(res => {
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
    const { dataSelected, periodSelected } = this.state;
    let tmpSeries = this.state.series,
      newData = [],
      isTodoGrouped = dataSelected === "all",
      goalTitle = null;

    // Check if removed or added activity
    if (
      this.props.activityList.length > prevProps.activityList.length &&
      prevProps.activityList.length !== 0
    ) {
      // Find new activity
      const newActivity = this.props.activityList.reduce((prev, current) =>
        prev.id > current.id ? prev : current
      );
      console.log(newActivity);
      // Check whether activity is ToDo
      if (newActivity.is_todo) {
        // Check whether ToDos are grouped or visible
        if (isTodoGrouped) {
          goalTitle = "ToDos";
        } else if (dataSelected === "to-do") {
          goalTitle = newActivity.goal_title;
        } else if (dataSelected === "goal") return false; // If todos aren't visible, nothing to update
      } else {
        if (dataSelected === "to-do") return false; // If goals aren't visible, nothing to update
        goalTitle = newActivity.goal_title;
      }

      // Check if add or update series
      const dataSetIndex = this.state.series.findIndex(
        data => data.name === goalTitle
      );

      if (dataSetIndex >= 0) {
        // Update series data
        tmpSeries[dataSetIndex].data[tmpSeries[dataSetIndex].data.length - 1] +=
          newActivity.total_xp;
      } else {
        // Create new series data
        if (periodSelected === "day") {
          newData = [...Array(7)].map((_, i) =>
            i === 6 ? newActivity.total_xp : null
          );
        } else if (periodSelected === "week") {
          newData = [...Array(8)].map((_, i) =>
            i === 7 ? newActivity.total_xp : null
          );
        } else {
          newData = [...Array(6)].map((_, i) =>
            i === 5 ? newActivity.total_xp : null
          );
        }
        const newDataSet = {
          name: goalTitle,
          data: newData
        };
        tmpSeries.push(newDataSet);
      }
      this.setState({ type: "line", series: [] }, () =>
        this.setState({
          series: [...tmpSeries],
          type: "column"
        })
      );
    } else if (
      prevProps.activityList.length === 0 &&
      this.props.activityList.length === 1
    ) {
      const newActivity = this.props.activityList[0];

      if (newActivity.is_todo) {
        // Check whether ToDos are grouped or visible
        if (isTodoGrouped) {
          goalTitle = "ToDos";
        } else if (dataSelected === "to-do") {
          goalTitle = newActivity.goal_title;
        } else if (dataSelected === "goal") return false; // If todos aren't visible, nothing to update
      } else {
        if (dataSelected === "to-do") return false; // If goals aren't visible, nothing to update
        goalTitle = newActivity.goal_title;
      }

      if (periodSelected === "day") {
        newData = [...Array(7)].map((_, i) =>
          i === 6 ? newActivity.total_xp : null
        );
      } else if (periodSelected === "week") {
        newData = [...Array(8)].map((_, i) =>
          i === 7 ? newActivity.total_xp : null
        );
      } else {
        newData = [...Array(6)].map((_, i) =>
          i === 5 ? newActivity.total_xp : null
        );
      }
      const newDataSet = {
        name: goalTitle,
        data: newData
      };
      tmpSeries.push(newDataSet);
    } else if (this.props.activityList.length < prevProps.activityList.length) {
      // Check if remove.remove  / remove.update

      // Get list of all new and previous ids
      const newIds = this.props.activityList.map(activity => activity.id);
      const oldIds = prevProps.activityList.map(activity => activity.id);
      let removedId, removedActivity;

      // Loop through and check which ones are in both
      oldIds.forEach(id => {
        if (!newIds.includes(id)) removedId = id;
      });

      // Use ID to find remove object
      removedActivity = removedId
        ? prevProps.activityList.filter(
            activity => activity.id === removedId
          )[0]
        : null;

      // Check whether activity is ToDo
      if (removedActivity.is_todo) {
        // Check whether ToDos are grouped or visible
        if (isTodoGrouped) {
          goalTitle = "ToDos";
        } else if (dataSelected === "to-do") {
          goalTitle = removedActivity.goal_title;
        } else if (dataSelected === "goal") return false; // If todos aren't visible, nothing to update
      } else {
        if (dataSelected === "to-do") return false; // If goals aren't visible, nothing to update
        goalTitle = removedActivity.goal_title;
      }

      // Find data series to update
      const dataSetIndex = tmpSeries.findIndex(data => data.name === goalTitle);

      // Check whether to update or remove series
      const newValue =
        tmpSeries[dataSetIndex].data[tmpSeries[dataSetIndex].data.length - 1] -
        removedActivity.total_xp;

      if (newValue > 0) {
        tmpSeries[dataSetIndex].data[
          tmpSeries[dataSetIndex].data.length - 1
        ] = newValue;
      } else {
        const total = tmpSeries[dataSetIndex].data.reduce(
          (sum, val) => (sum += val),
          0
        );
        if (total > 0) {
          tmpSeries[dataSetIndex].data[
            tmpSeries[dataSetIndex].data.length - 1
          ] = null;
        } else {
          tmpSeries.splice(dataSetIndex, 1);
        }
      }

      this.setState({ type: "line", series: [] }, () =>
        this.setState({
          series: [...tmpSeries],
          type: "column"
        })
      );
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getGoalXpByDay = (goals, dataType) => {
    let series = [];
    let categories = [];

    // Sort all activities by created_at and sum for the period
    goals.forEach((goal, index) => {
      let i = 0;
      let xpArray = [];
      let hasXp = false;
      const today = new Date();

      // Loop through last 7 days
      for (i = 0; i < 7; i++) {
        const startDate =
          i === 0 ? startOfDay(today) : startOfDay(addDays(today, -i));
        const endDate = i === 0 ? today : endOfDay(addDays(today, -i));
        let finalXp = 0;

        if (index === 0) categories.push(startDate.toString().split(" ")[0]);

        // Filter and sum xp_total for activities
        const xpForPeriod = goal
          .filter(
            activity =>
              new Date(activity.created_at) > startDate &&
              new Date(activity.created_at) < endDate
          )
          .reduce((sum, { total_xp }) => (sum += total_xp), 0);

        // Remove 0s from array and replace with null
        if (xpForPeriod > 0) {
          hasXp = true;
          finalXp = xpForPeriod;
        } else {
          finalXp = null;
        }

        xpArray.push(finalXp);
      }

      // Create object for Chart component
      if (hasXp) {
        const data = {
          name:
            goal[0].is_todo && dataType === "all"
              ? "ToDos"
              : goal[0].goal_title,
          data: xpArray.reverse()
        };
        series.push(data);
      }
    });

    return { series, categories };
  };

  getGoalXpByWeek = (goals, dataType) => {
    let series = [];
    let categories = [];

    // Sort all activities by created_at and sum for the period
    goals.forEach((goal, index) => {
      let i = 0;
      let hasXp = false;
      let xpArray = [];
      const today = new Date();

      // Loop through last 7 days
      for (i = 0; i < 8; i++) {
        const startDate =
          i === 0
            ? startOfDay(startOfWeek(today, { weekStartsOn: 1 }))
            : startOfDay(startOfWeek(addWeeks(today, -i), { weekStartsOn: 1 }));
        const endDate =
          i === 0 ? today : endOfDay(endOfWeek(addWeeks(today, -i)));
        let finalXp = 0;

        if (index === 0)
          categories.push(`${startDate.getDate()}/${startDate.getMonth() + 1}`);
        // Filter and sum xp_total for activities
        const xpForPeriod = goal
          .filter(
            activity =>
              new Date(activity.created_at) > startDate &&
              new Date(activity.created_at) < endDate
          )
          .reduce((sum, { total_xp }) => (sum += total_xp), 0);

        // Remove 0s from array and replace with null
        if (xpForPeriod > 0) {
          hasXp = true;
          finalXp = xpForPeriod;
        } else {
          finalXp = null;
        }

        xpArray.push(finalXp);
      }

      // Create object for Chart component
      if (hasXp) {
        const data = {
          name:
            goal[0].is_todo && dataType === "all"
              ? "ToDos"
              : goal[0].goal_title,
          data: xpArray.reverse()
        };
        series.push(data);
      }
    });

    return { series, categories };
  };

  getGoalXpByMonth = (goals, dataType) => {
    let series = [];
    let categories = [];

    // Sort all activities by created_at and sum for the period
    goals.forEach((goal, index) => {
      let i = 0;
      let hasXp = false;
      let xpArray = [];
      const today = new Date();

      // Loop through last 7 days
      for (i = 0; i < 6; i++) {
        const startDate =
          i === 0
            ? startOfDay(startOfMonth(today))
            : startOfDay(startOfMonth(addMonths(today, -i)));
        const endDate =
          i === 0 ? today : endOfDay(endOfMonth(addMonths(today, -i)));
        let finalXp = 0;

        if (index === 0)
          categories.push(`${startDate.getDate()}/${startDate.getMonth() + 1}`);
        // Filter and sum xp_total for activities
        const xpForPeriod = goal
          .filter(
            activity =>
              new Date(activity.created_at) > startDate &&
              new Date(activity.created_at) < endDate
          )
          .reduce((sum, { total_xp }) => (sum += total_xp), 0);

        // Remove 0s from array and replace with null
        if (xpForPeriod > 0) {
          hasXp = true;
          finalXp = xpForPeriod;
        } else {
          finalXp = null;
        }

        xpArray.push(finalXp);
      }

      // Create object for Chart component
      if (hasXp) {
        const data = {
          name:
            goal[0].is_todo && dataType === "all"
              ? "ToDos"
              : goal[0].goal_title,
          data: xpArray.reverse()
        };
        series.push(data);
      }
    });

    return { series, categories };
  };

  switchChartPeriodHandler = period => {
    if (this.state.periodSelected === period) return false;
    const { dataSelected } = this.state;
    axios
      .post("/api/v1/get_chart_data", {
        period: period,
        dataType: dataSelected
      })
      .then(res => {
        console.log(res.data);
        const { title, categories, series } = res.data;
        this.setState({
          title: title,
          categories: categories,
          series: series,
          periodSelected: period
        });
      });
  };

  switchChartDataHandler = () => {
    // if (dataType === this.state.dataSelected) return false;
    const activities = this.props.activityList;
    const { periodSelected } = this.state;
    const dataType = this.state.dataSelected;
    let goals = [],
      series = [],
      categories = [];

    // Group all activities by Goal ID
    const groupBy = activities.reduce((acc, curr) => {
      if (!acc[curr.goal_id]) acc[curr.goal_id] = []; // If this type wasn't previously stored
      acc[curr.goal_id].push(curr);
      return acc;
    }, {});

    // Grab all goals that match param: dataType
    switch (dataType) {
      case "to-do":
        Object.keys(groupBy).forEach(key => {
          if (groupBy[key][0].is_todo) goals.push(groupBy[key]);
        });
        break;
      case "goal":
        Object.keys(groupBy).forEach(key => {
          if (!groupBy[key][0].is_todo) goals.push(groupBy[key]);
        });
        break;
      case "all":
        let todos = [];
        Object.keys(groupBy).forEach(key => {
          if (!groupBy[key][0].is_todo) {
            goals.push(groupBy[key]);
          } else {
            todos.push(...groupBy[key]);
          }
        });
        goals.push(todos);
        break;
      default:
        break;
    }

    switch (periodSelected) {
      case "day":
        ({ series, categories } = this.getGoalXpByDay(goals, dataType));
        break;
      case "week":
        ({ series, categories } = this.getGoalXpByWeek(goals, dataType));
        break;
      case "month":
        ({ series, categories } = this.getGoalXpByMonth(goals, dataType));
        break;
      default:
        ({ series, categories } = this.getGoalXpByDay(goals));
    }

    this.setState({ type: "line", series: [] }, () =>
      this.setState({
        type: "column",
        categories: categories.reverse(),
        series: series,
        dataSelected: dataType
      })
    );
  };

  handleSwitchGraphMenu = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        displayMenu: !prevState.displayMenu,
        options: prevState.displayMenu
          ? prevState.options
          : prevState.options.map(opt => {
              return {
                ...opt,
                isActive: false
              };
            })
      };
    });
  };

  handleMainMenuHover = option => {
    this.setState(prevState => {
      const updatedOptions = prevState.options.map(opt => {
        return {
          ...opt,
          isActive: opt.id === option.id
        };
      });
      return {
        ...prevState,
        options: [...updatedOptions]
      };
    });
  };

  handleSubMenuOptionClick = subOption => {
    // Find which attribute has been changed (data/period)
    let updatedOption = this.state.options.filter(opt => opt.isActive)[0];

    // Update that attribute with new value
    const updatedSubOptions = updatedOption.subOptions.map(opt => {
      return {
        ...opt,
        isActive: opt.id === subOption.id
      };
    });

    updatedOption.subOptions = [...updatedSubOptions];

    // Depending on what changed, update state
    switch (updatedOption.meta) {
      case "data":
        this.setState(
          prevState => {
            return {
              ...prevState,
              displayMenu: false,
              dataSelected: updatedOption.subOptions.filter(
                opt => opt.isActive
              )[0].meta,
              options: prevState.options.map(opt => {
                if (opt.isActive) {
                  return {
                    ...opt,
                    subOptions: [...updatedSubOptions]
                  };
                } else {
                  return opt;
                }
              })
            };
          },
          () => this.switchChartDataHandler()
        );
        break;
      case "period":
        this.setState(
          prevState => {
            return {
              ...prevState,
              displayMenu: false,
              periodSelected: updatedOption.subOptions.filter(
                opt => opt.isActive
              )[0].meta,
              options: prevState.options.map(opt => {
                if (opt.isActive) {
                  return {
                    ...opt,
                    subOptions: [...updatedSubOptions]
                  };
                } else {
                  return opt;
                }
              })
            };
          },
          () => this.switchChartDataHandler()
        );
        break;
      default:
        return false;
    }
  };

  render() {
    const {
      title,
      categories,
      series,
      type,
      dataSelected,
      periodSelected,
      displayMenu,
      options
    } = this.state;
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
            dataType={dataSelected[0].toUpperCase() + dataSelected.slice(1)}
            periodType={
              periodSelected[0].toUpperCase() + periodSelected.slice(1)
            }
          />
          <GraphButton
            switchMenu={this.handleSwitchGraphMenu}
            isOpen={displayMenu}
            options={options}
            handleHover={this.handleMainMenuHover}
            handleSubOptionClick={this.handleSubMenuOptionClick}
          />
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

/*
<div className={classes.LeftChartSwitchBtns}>
  <button
    type="button"
    className={[
      classes.BtnSwitch,
      dataSelected === "all" ? classes.ActiveBtn : null
    ].join(" ")}
    onClick={() => this.switchChartDataHandler("all")}
  >
    All
  </button>
  <button
    type="button"
    className={[
      classes.BtnSwitch,
      dataSelected === "goal" ? classes.ActiveBtn : null
    ].join(" ")}
    onClick={() => this.switchChartDataHandler("goal")}
  >
    Goals
  </button>
  <button
    type="button"
    className={[
      classes.BtnSwitch,
      dataSelected === "todo" ? classes.ActiveBtn : null
    ].join(" ")}
    onClick={() => this.switchChartDataHandler("todo")}
  >
    ToDos
  </button>
</div>
<div className={classes.RightChartSwitchBtns}>
  <button
    type="button"
    className={[
      classes.BtnSwitch,
      periodSelected === "day" ? classes.ActiveBtn : null
    ].join(" ")}
    onClick={() => this.switchChartPeriodHandler("day")}
  >
    Daily
  </button>
  <button
    type="button"
    className={[
      classes.BtnSwitch,
      periodSelected === "week" ? classes.ActiveBtn : null
    ].join(" ")}
    onClick={() => this.switchChartPeriodHandler("week")}
  >
    Weekly
  </button>
  <button
    type="button"
    className={[
      classes.BtnSwitch,
      periodSelected === "month" ? classes.ActiveBtn : null
    ].join(" ")}
    onClick={() => this.switchChartPeriodHandler("month")}
  >
    Monthly
  </button>
</div>
*/
