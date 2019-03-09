import React from "react";

import classNames from "classnames";

import classes from "./TextInput.module.css";

const textInput = ({
  value,
  name,
  type,
  handleChange,
  handleFocus,
  isFocused,
  handleBlur
}) => {
  const btnClass = classNames({
    [`${classes.TextLabelFocused}`]: value.length > 0 || isFocused
  });
  return (
    <div className={classes.TextGroup}>
      <label forhtml={name} className={[classes.TextLabel, btnClass].join(" ")}>
        {name.replace("_", " ")}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className={classes.TextInput}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          borderBottom: isFocused
            ? "2px solid #162756"
            : "2px solid transparent"
        }}
      />
    </div>
  );
};

export default textInput;
