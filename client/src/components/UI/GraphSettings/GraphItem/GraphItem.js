import React from "react";

import classes from "./GraphItem.module.css";

const graphItem = ({ opt, handleHover, handleSubOptionClick }) => {
  const subOptions = opt.isActive ? (
    <ul className={classes.SubMenuList}>
      {opt.subOptions.map(opt => (
        <li
          className={classes.SubMenuItem}
          key={opt.id}
          onClick={() => handleSubOptionClick(opt)}
          style={opt.isActive ? { backgroundColor: "#9099b9" } : {}}
        >
          <span>{opt.title}</span>
          {opt.isActive ? <i className="fas fa-check" /> : null}
        </li>
      ))}
    </ul>
  ) : null;
  return (
    <li
      key={opt.id}
      className={classes.MenuItem}
      style={opt.isActive ? { backgroundColor: "#9099b9" } : {}}
      onMouseEnter={() => handleHover(opt)}
    >
      <span>{opt.title}</span>
      <i className="fa fa-angle-right" />
      {subOptions}
    </li>
  );
};

export default graphItem;
