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

  componentWillUnmount() {
    clearTimeout(this.timeOutCheck);
    cancelAnimationFrame(this.loadProgress);
  }

  render() {
    return (
      <span
        className={classes.ProgressBar}
        style={{ width: this.state.width }}
      />
    );
  }
}

export default ProgressBar;
