import React, { Component } from "react";
import classNames from "classnames";

import classes from "./CategoryButton.module.css";

class CategoryButton extends Component {
  getColors = () => {
    const { sectionCount, colors } = this.props;
    console.log(colors);
    switch (sectionCount) {
      case 0:
        return {
          backgroundColor: "transparent"
        };
      case 1:
        return {
          backgroundColor: colors[0]
        };
      case 2:
        return {
          borderLeft: `12px solid ${colors[0]}`,
          borderRight: `12px solid ${colors[1]}`
        };
      case 3:
        return {
          borderRightColor: colors[0],
          borderTopColor: colors[1], // yellow
          borderBottomColor: colors[0],
          borderLeftColor: colors[2] // green
        };
      case 4:
        return {
          borderColor: `${colors[0]} ${colors[1]} ${colors[2]} ${colors[3]}`
        };
    }
  };

  isEmpty = () => {
    const { sectionCount } = this.props;
    if (sectionCount > 0) return null;
    return <i className="fa fa-edit" />;
  };

  render() {
    const { sectionCount, colors, handleBtnClick, item } = this.props;
    const btnClass = classNames({
      [`${classes.Nothing}`]: sectionCount === 0,
      [`${classes.Single}`]: sectionCount === 1,
      [`${classes.Double}`]: sectionCount === 2,
      [`${classes.Triple}`]: sectionCount === 3,
      [`${classes.Quad}`]: sectionCount === 4
    });
    let btnFiller = null;
    const btnStyles = this.getColors();
    if (sectionCount === 0) {
      btnFiller = <i className="fas fa-pen" />;
    } else if (sectionCount === 3) {
      btnFiller = [
        <div
          key={0}
          className={classes.TripleAfter}
          style={{ borderTopColor: colors[1] }}
        />,
        <div
          key={1}
          className={classes.TripleBefore}
          style={{ borderLeftColor: colors[2] }}
        />
      ];
    }
    return (
      <div
        onClick={() => handleBtnClick(item)}
        className={[classes.CategoryButton, btnClass].join(" ")}
        style={btnStyles}
      >
        {btnFiller}
      </div>
    );
  }
}

export default CategoryButton;
