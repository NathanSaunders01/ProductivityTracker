import React from "react";

import CategoryItem from "./CategoryItem/CategoryItem";
import classes from "./CategoryList.module.css";

const categoryList = ({ categoryList, selectedCategories, clickCategory }) => {
  const categoryItems = categoryList.map(category => (
    <CategoryItem
      key={category.id}
      category={category}
      isActive={selectedCategories.includes(category.id)}
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
