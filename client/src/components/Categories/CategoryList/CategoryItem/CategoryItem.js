import React from "react";

import classes from "./CategoryItem.module.css";

const categoryItem = ({
  category,
  isActive,
  clickCategory,
  removeCategory
}) => {
  const wrapperStyle = {
    backgroundColor: isActive ? category.color : "white",
    border: isActive ? "2px solid transparent" : `2px solid ${category.color}`
  };
  const textStyle = {
    color: isActive ? "white" : category.color
  };
  return (
    <li className={classes.Category}>
      <span
        className={classes.CategoryMain}
        style={wrapperStyle}
        onClick={() => clickCategory(category)}
      >
        <span className={classes.Title} style={textStyle}>
          {category.title}
        </span>
      </span>
      <button
        type="button"
        className={classes.Delete}
        onClick={() => removeCategory(category)}
      />
    </li>
  );
};

export default categoryItem;
