import React from "react";

import classNames from "classnames";

import classes from "./CircleButton.module.css";

const circleButton = ({ clickBtnHandler, isOpen }) => {
  const btnClass = classNames({
    [`${classes.ButtonRotated}`]: isOpen
  });
  return (
    <button
      type="button"
      className={[classes.Button, btnClass].join(" ")}
      onClick={clickBtnHandler}
    >
      +
    </button>
  );
};

export default circleButton;
