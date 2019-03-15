import React from "react";

import classes from "./CategoryItem.module.css";

const categoryItem = ({ category, isActive, clickCategory }) => {
  const wrapperStyle = {
    backgroundColor: isActive ? category.color : "white",
    border: isActive ? "2px solid transparent" : `2px solid ${category.color}`
  };
  const textStyle = {
    color: isActive ? "white" : category.color
  };
  return (
    <li className={classes.Category} onClick={() => clickCategory(category)}>
      <span className={classes.CategoryMain} style={wrapperStyle}>
        <span className={classes.Title} style={textStyle}>
          {category.title}
        </span>
      </span>
      <button type="button" className={classes.Delete} />
    </li>
  );
};

export default categoryItem;
