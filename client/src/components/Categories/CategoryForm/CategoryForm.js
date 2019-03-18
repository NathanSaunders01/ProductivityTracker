import React from "react";
import { SketchPicker } from "react-color";

import TextInput from "../../UI/TextInput/TextInput";
import classes from "./CategoryForm.module.css";

const categoryForm = ({
  handleTextChange,
  handleFocus,
  handleBlur,
  handleColorClick,
  submitFormHandler,
  color,
  title,
  focusedEl,
  showColorPicker,
  handleColorClose,
  handleColorChange
}) => {
  return (
    <form onSubmit={submitFormHandler}>
      <div className={classes.FormGroup}>
        <div className={classes.Color}>
          <div className={classes.ColorWrapper} onClick={handleColorClick}>
            <div
              className={classes.ColorSwatch}
              style={color.length > 0 ? { backgroundColor: color } : {}}
            >
              {color.length === 0 ? <i className="fas fa-pen" /> : null}
            </div>
          </div>
          {showColorPicker ? (
            <div className={classes.Popover}>
              <div className={classes.Cover} onClick={handleColorClose} />
              <SketchPicker color={color} onChange={handleColorChange} />
            </div>
          ) : null}
        </div>
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

export default categoryForm;
