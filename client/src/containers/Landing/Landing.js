import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Register from "../../components/Auth/Register/Register";
import Login from "../../components/Auth/Login/Login";
import Spinner from "../../components/UI/Spinner/Spinner";

import classes from "./Landing.module.css";

class Landing extends Component {
  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  logoutHandler = () => {
    this.props.logoutUser();
  };

  render() {
    let content = (
      <div className={classes.LoadingContainer}>
        <Spinner />
      </div>
    );
    if (!this.props.auth.isLoading) {
      content = (
        <div>
          <Register />
          <Login />
        </div>
      );
    }
    return <div style={{}}>{content}</div>;
  }
}

Landing.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Landing);
