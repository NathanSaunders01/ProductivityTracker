import React, { Component } from "react";

import ToDoItem from "./ToDoItem/ToDoItem";
import classes from "./ToDoList.module.css";

const toDoList = ({ todoList, setRef }) => {
  const todoItems = todoList
    .map(item => <ToDoItem item={item} key={item.id} />)
    .concat(<div key={"000"} ref={setRef} />);
  const blankMessage =
    todoList.length > 0 ? null : <p>You have no items on your TODO list!</p>;
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
      <ul
        className={classes.List}
        style={{ paddingRight: todoList.length > 7 ? "16px" : "0px" }}
      >
        {blankMessage}
        {todoItems}
      </ul>
    </div>
  );
};

export default toDoList;
