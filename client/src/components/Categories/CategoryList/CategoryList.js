import React from "react";

import CategoryItem from "./CategoryItem/CategoryItem";
import classes from "./CategoryList.module.css";

const categoryList = ({ categoryList, goalToCategorise, clickCategory }) => {
  const categoryItems = categoryList.map(category => (
    <CategoryItem
      key={category.id}
      category={category}
      isActive={
        goalToCategorise.categories &&
        goalToCategorise.categories.includes(category.id)
      }
      clickCategory={clickCategory}
    />
  ));
  return (
    <div>
      <ul className={classes.CategoryList}>{categoryItems}</ul>
    </div>
  );
};

export default categoryList;
