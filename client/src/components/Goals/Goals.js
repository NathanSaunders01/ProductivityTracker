import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addGoal, removeGoal } from "../../actions/goalActions";

import GoalList from "./GoalList/GoalList";
import GoalForm from "./GoalForm/GoalForm";
import CircleButton from "../UI/CircleButton/CircleButton";
import classes from "./Goals.module.css";

class Goals extends Component {
  constructor() {
    super();

    this.state = {
      showForm: false,
      title: "",
      xp: "",
      frequency: "",
      focusedEl: null
    };

    this.itemRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.goalList > prevProps.goalList) {
      this.setState({
        title: "",
        xp: "",
        frequency: "",
        focusedEl: null
      });
      if (prevProps.goalList.length !== 0) {
        this.itemRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { title, xp, frequency } = this.state;

    const goalData = {
      title,
      frequency,
      xp_value: xp,
      is_recurring: 1
    };

    console.log(goalData);
    this.props.addGoal(goalData);
  };

  handleTextChange = e => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  handleFocus = e => {
    const name = e.target.name;
    this.setState({
      focusedEl: name
    });
  };

  handleBlur = e => {
    this.setState({
      focusedEl: null
    });
  };

  switchAddGoalItem = () => {
    this.setState(prevState => {
      return {
        title: prevState.showForm ? "" : prevState.title,
        xp: prevState.showForm ? "" : prevState.xp,
        frequency: prevState.showForm ? "" : prevState.frequency,
        focusedEl: prevState.showForm ? null : prevState.focusedEl,
        showForm: !prevState.showForm
      };
    });
  };

  render() {
    const { title, xp, frequency, focusedEl, showForm } = this.state;
    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <h4>Goals</h4>
        </div>
        <div className={classes.Content}>
          <GoalList goalList={this.props.goalList} setRef={this.itemRef} />
          <div
            className={classes.FormWrapper}
            style={{ height: showForm ? "60px" : 0 }}
          >
            <GoalForm
              focusedEl={focusedEl}
              title={title}
              xp={xp}
              frequency={frequency}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
              handleTextChange={this.handleTextChange}
              submitFormHandler={this.onSubmit}
            />
          </div>
          <CircleButton
            isOpen={showForm}
            clickBtnHandler={this.switchAddGoalItem}
          />
        </div>
      </div>
    );
  }
}

Goals.propTypes = {
  addGoal: PropTypes.func.isRequired,
  removeGoal: PropTypes.func.isRequired,
  goalList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  goalList: state.goal.goalList
});

export default connect(
  mapStateToProps,
  { addGoal, removeGoal }
)(Goals);
