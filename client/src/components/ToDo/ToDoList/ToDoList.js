import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ToDoItem from "./ToDoItem/ToDoItem";
import classes from "./ToDoList.module.css";

const toDoList = ({ todoList }) => {
  const todoItems = todoList.map(item => (
    <CSSTransition key={item.id} timeout={500} classNames="move">
      <ToDoItem item={item} key={item.id} />
    </CSSTransition>
  ));
  const blankMessage =
    todoList.length > 0 ? null : (
      <CSSTransition timeout={500} classNames="move">
        <p>You have no items on your TODO list!</p>
      </CSSTransition>
    );
  const header =
    todoList.length > 0 ? (
      <div
        className={classes.Header}
        style={{ paddingRight: todoList.length > 7 ? "16px" : "0px" }}
      >
        <span className={classes.Title}>Title</span>
        <span className={classes.Timer}>Timer</span>
        <span className={classes.Xp}>XP</span>
        <span className={classes.Actions}>Actions</span>
      </div>
    ) : null;
  return (
    <div>
      {header}
      <TransitionGroup
        className={classes.List}
        style={{ paddingRight: todoList.length >= 7 ? "16px" : "0px" }}
      >
        {blankMessage}
        {todoItems}
      </TransitionGroup>
    </div>
  );
};

export default toDoList;
