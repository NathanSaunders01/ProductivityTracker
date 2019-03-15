import React, { Component } from "react";

import CategoryList from "./CategoryList/CategoryList";
import CategoryForm from "./CategoryForm/CategoryForm";
import CircleButton from "../UI/CircleButton/CircleButton";
import classes from "./Categories.module.css";

class Categories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryList: [
        { id: 1, title: "Health", color: "#918A3F" },
        { id: 2, title: "Mind", color: "#417505" },
        { id: 3, title: "Social", color: "#9013FE" }
      ],
      selectedCategories: [3],
      title: "",
      color: "#85A3D1",
      focusedEl: "",
      showForm: false,
      showColorPicker: false
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { title, color } = this.state;

    const goalData = {
      id: 4,
      title,
      color
    };

    this.setState(prevState => {
      return {
        categoryList: prevState.categoryList.concat(goalData)
      };
    });

    // console.log(goalData);
    // this.props.addGoal(goalData);
  };

  handleTextChange = e => {
    const name = e.target.name;
    const val = e.target.value;
    this.setState({
      [name]: val
    });
  };

  handleFocus = e => {
    const name = e.target.name;
    this.setState({
      focusedEl: name,
      showColorPicker: false
    });
  };

  handleBlur = e => {
    this.setState({
      focusedEl: null
    });
  };

  switchAddCategoryItem = () => {
    this.setState(prevState => {
      return {
        title: prevState.showForm ? "" : prevState.title,
        focusedEl: prevState.showForm ? null : prevState.focusedEl,
        showForm: !prevState.showForm
      };
    });
  };

  handleColorClick = () => {
    this.setState(prevState => {
      return {
        showColorPicker: true
      };
    });
  };

  handleColorClose = () => {
    this.setState({ showColorPicker: false });
  };

  handleColorChange = color => {
    this.setState({ color: color.hex });
  };

  handleClickCategory = category => {
    console.log(category);
    if (this.state.selectedCategories.includes(category.id)) {
      console.log("hello remove");
      this.setState(prevState => {
        return {
          selectedCategories: prevState.selectedCategories.filter(
            cat => cat !== category.id
          )
        };
      });
    } else {
      this.setState(prevState => {
        return {
          selectedCategories: prevState.selectedCategories.concat(category.id)
        };
      });
    }
  };

  render() {
    const {
      title,
      color,
      focusedEl,
      showForm,
      selectedCategories,
      showColorPicker
    } = this.state;
    return (
      <div className={classes.Categories}>
        <h2 className={classes.Header}>Categories</h2>
        <CategoryList
          categoryList={this.state.categoryList}
          selectedCategories={selectedCategories}
          clickCategory={this.handleClickCategory}
        />
        <div
          className={classes.FormWrapper}
          style={{ height: showForm ? "60px" : 0 }}
        >
          <CategoryForm
            focusedEl={focusedEl}
            title={title}
            color={color}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
            handleTextChange={this.handleTextChange}
            handleColorClick={this.handleColorClick}
            handleColorClose={this.handleColorClose}
            handleColorChange={this.handleColorChange}
            submitFormHandler={this.onSubmit}
            showColorPicker={showColorPicker}
          />
        </div>
        <CircleButton
          isOpen={showForm}
          clickBtnHandler={this.switchAddCategoryItem}
        />
      </div>
    );
  }
}

export default Categories;
