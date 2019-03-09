import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ActivityList from "./ActivityList/ActivityList";
import classes from "./Activities.module.css";

class Activities extends Component {
  render() {
    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <h4>Activity</h4>
        </div>
        <div className={classes.Content}>
          <ActivityList activityList={this.props.activityList} />
        </div>
      </div>
    );
  }
}

Activities.propTypes = {
  activityList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  activityList: state.activity.activityList
});

export default connect(mapStateToProps)(Activities);
