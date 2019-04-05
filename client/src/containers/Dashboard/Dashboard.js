import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";
import { closeCategoriesBox } from "../../actions/goalActions";
import Alert from "../../components/Alert/Alert";
import Navigation from "../../components/Navigation/Navigation";
import ToDo from "../../components/ToDo/ToDo";
import Analytics from "../../components/Analytics/Analytics";
import Goals from "../../components/Goals/Goals";
import Activities from "../../components/Activities/Activities";
import Rewards from "../../components/Rewards/Rewards";
import Categories from "../../components/Categories/Categories";
import BackDrop from "../../components/UI/BackDrop/BackDrop";

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
    const {
      displayCategories,
      goalToCategorise,
      logoutUser,
      closeCategoriesBox
    } = this.props;
    let backDrop = null;
    if (displayCategories) {
      backDrop = <BackDrop show={true} clicked={closeCategoriesBox} />;
    }
    return (
      <div>
        <Navigation />
        <Alert />
        {backDrop}
        <h1>Dashboard</h1>
        <button type="button" onClick={logoutUser}>
          LOGOUT
        </button>
        <Categories
          displayCategories={displayCategories}
          goal={goalToCategorise}
        />
        <div className={classes.BlockGroup}>
          <Rewards />
        </div>
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
  auth: PropTypes.object.isRequired,
  goalToCategorise: PropTypes.object.isRequired,
  displayCategories: PropTypes.bool.isRequired,
  closeCategoriesBox: PropTypes.func.isRequired,
  alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  goalToCategorise: state.goal.goalToCategorise,
  displayCategories: state.goal.displayCategories,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { logoutUser, closeCategoriesBox }
)(Dashboard);
