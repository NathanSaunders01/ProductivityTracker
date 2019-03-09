import React from "react";

import TextInput from "../../UI/TextInput/TextInput";

import classes from "./ToDoForm.module.css";

const toDoForm = ({
  handleTextChange,
  handleFocus,
  handleBlur,
  submitFormHandler,
  title,
  xp,
  timer,
  focusedEl
}) => {
  return (
    <form className={classes.Form} onSubmit={submitFormHandler}>
      <div className={classes.FormGroup}>
        <div className={classes.Title}>
          <TextInput
            type="text"
            value={title}
            name="title"
            handleChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isFocused={focusedEl === "title"}
          />
        </div>
        <div className={classes.Timer}>
          <TextInput
            type="number"
            value={timer}
            name="timer"
            handleChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isFocused={focusedEl === "timer"}
          />
        </div>
        <div className={classes.XpValue}>
          <TextInput
            type="number"
            value={xp}
            name="xp"
            handleChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isFocused={focusedEl === "xp"}
          />
        </div>
        <button
          type="submit"
          className={classes.Submit}
          onClick={submitFormHandler}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default toDoForm;
