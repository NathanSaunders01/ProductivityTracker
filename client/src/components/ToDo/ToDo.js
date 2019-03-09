import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTodo, removeGoal } from "../../actions/goalActions";

import CircleButton from "../UI/CircleButton/CircleButton";
import ToDoForm from "./ToDoForm/ToDoForm";
import ToDoList from "./ToDoList/ToDoList";

import classes from "./ToDo.module.css";

class ToDo extends Component {
  constructor() {
    super();

    this.state = {
      showForm: false,
      title: "",
      xp: "",
      timer: "",
      focusedEl: null
    };

    this.itemRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.todoList > prevProps.todoList) {
      this.setState({
        title: "",
        xp: "",
        timer: "",
        focusedEl: null
      });
      if (prevProps.todoList.length !== 0) {
        this.itemRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end"
        });
      }
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { title, xp, timer } = this.state;

    const todoData = {
      title,
      frequency: timer,
      xp_value: xp,
      is_recurring: 0
    };

    console.log(todoData);
    this.props.addTodo(todoData);
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

  switchAddToDoItem = () => {
    this.setState(prevState => {
      return {
        title: prevState.showForm ? "" : prevState.title,
        xp: prevState.showForm ? "" : prevState.xp,
        timer: prevState.showForm ? "" : prevState.timer,
        focusedEl: prevState.showForm ? null : prevState.focusedEl,
        showForm: !prevState.showForm
      };
    });
  };

  render() {
    const { title, xp, timer, focusedEl, showForm } = this.state;

    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <h4>ToDo List</h4>
        </div>
        <div className={classes.Content}>
          <ToDoList todoList={this.props.todoList} setRef={this.itemRef} />
          <div
            className={classes.FormWrapper}
            style={{ height: showForm ? "60px" : 0 }}
          >
            <ToDoForm
              focusedEl={focusedEl}
              title={title}
              xp={xp}
              timer={timer}
              handleFocus={this.handleFocus}
              handleBlur={this.handleBlur}
              handleTextChange={this.handleTextChange}
              submitFormHandler={this.onSubmit}
            />
          </div>
          <CircleButton
            isOpen={this.state.showForm}
            clickBtnHandler={this.switchAddToDoItem}
          />
        </div>
      </div>
    );
  }
}

ToDo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  removeGoal: PropTypes.func.isRequired,
  todoList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  todoList: state.goal.todoList
});

export default connect(
  mapStateToProps,
  { addTodo, removeGoal }
)(ToDo);
