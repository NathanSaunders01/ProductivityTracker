import React from "react";
import classNames from "classnames";

import GraphItem from "./GraphItem/GraphItem";
import classes from "./GraphButton.module.css";

const graphButton = ({
  isOpen,
  switchMenu,
  options,
  handleHover,
  handleSubOptionClick
}) => {
  const mainOptions = isOpen ? (
    <ul className={classes.MainList}>
      {options.map(opt => (
        <GraphItem
          key={opt.id}
          opt={opt}
          handleHover={handleHover}
          handleSubOptionClick={handleSubOptionClick}
        />
      ))}
    </ul>
  ) : null;
  return (
    <div className={classes.MenuContainer}>
      <div className={classes.MenuWrapper}>
        <button
          className={[
            classes.Button,
            classNames({
              [`${classes.Open}`]: isOpen,
              [`${classes.Closed}`]: !isOpen
            })
          ].join(" ")}
          type="button"
          onClick={switchMenu}
        >
          <i
            style={{ transform: isOpen ? "rotate(-45deg)" : "rotate(0)" }}
            className="fas fa-cog"
          />
        </button>
        {mainOptions}
      </div>
    </div>
  );
};

export default graphButton;
