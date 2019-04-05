import React, { Component } from "react";

import classes from "./ProgressBar.module.css";

class ProgressBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    this.timeOutCheck = setTimeout(
      function() {
        this.loadProgress = requestAnimationFrame(() => {
          this.setState({ width: this.props.width });
        });
      }.bind(this),
      500
    );
  }

  componentDidUpdate() {
    this.loadProgress = requestAnimationFrame(() => {
      this.setState({ width: this.props.width });
    });
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutCheck);
    cancelAnimationFrame(this.loadProgress);
  }

  render() {
    const { width } = this.state;
    const { color } = this.props;
    return (
      <span
        className={classes.ProgressBar}
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    );
  }
}

export default ProgressBar;
