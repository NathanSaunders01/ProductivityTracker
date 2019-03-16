import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateCategoryForGoal } from "../../actions/goalActions";
import { addCategory, removeCategory } from "../../actions/categoryActions";

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

  componentDidUpdate(prevProps, prevState) {
    if (this.props.categoryList > prevProps.categoryList) {
      this.setState({
        title: "",
        focusedEl: null,
        showColorPicker: false
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const { title, color } = this.state;

    const categoryData = {
      title: title,
      color: color
    };

    this.props.addCategory(categoryData);
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
    const { goalToCategorise, updateCategoryForGoal } = this.props;

    const data = {
      goal: {
        id: goalToCategorise.id
      },
      categoryId: category.id
    };

    updateCategoryForGoal(data);

    // if (goalToCategorise.categories.includes(category.id)) {
    //   this.setState(prevState => {
    //     return {
    //       selectedCategories: prevState.selectedCategories.filter(
    //         cat => cat !== category.id
    //       )
    //     };
    //   });
    // } else {
    //   this.setState(prevState => {
    //     return {
    //       selectedCategories: prevState.selectedCategories.concat(category.id)
    //     };
    //   });
    // }
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
    const {
      displayCategories,
      goal,
      categoryList,
      goalToCategorise
    } = this.props;
    console.log(goalToCategorise);
    return (
      <div
        className={classes.Categories}
        style={{
          transform: displayCategories
            ? "translate(-50%,0)"
            : "translate(-50%, -100vh)",
          opacity: displayCategories ? "1" : "0"
        }}
      >
        <h2 className={classes.Header}>Categories</h2>
        <CategoryList
          categoryList={categoryList}
          goalToCategorise={goalToCategorise}
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

Categories.propTypes = {
  addCategory: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
  updateCategoryForGoal: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
  goalToCategorise: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categoryList: state.category.categoryList,
  goalToCategorise: state.goal.goalToCategorise
});

export default connect(
  mapStateToProps,
  { addCategory, removeCategory, updateCategoryForGoal }
)(Categories);
