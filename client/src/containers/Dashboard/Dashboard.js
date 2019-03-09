import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import ToDo from "../../components/ToDo/ToDo";
import Analytics from "../../components/Analytics/Analytics";
import Goals from "../../components/Goals/Goals";
import Activities from "../../components/Activities/Activities";

import classes from "./Dashboard.module.css";

class Dashboard extends Component {
  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentDidUpdate() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <button type="button" onClick={this.props.logoutUser}>
          LOGOUT
        </button>
        <div className={classes.BlockGroup}>
          <div className={classes.Small}>
            <ToDo />
          </div>
          <div className={classes.Large}>
            <Analytics />
          </div>
        </div>
        <div className={classes.BlockGroup}>
          <div className={classes.Large}>
            <Goals />
          </div>
          <div className={classes.Small}>
            <Activities />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
