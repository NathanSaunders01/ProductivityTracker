import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { logoutUser } from "../../actions/authActions";

import Register from "../../components/Auth/Register/Register";
import Login from "../../components/Auth/Login/Login";

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
    let name = "there";
    let controls = null;
    if (this.props.auth.isAuthenticated) {
      name = this.props.auth.user.first_name;
      controls = (
        <button type="button" onClick={this.logoutHandler}>
          Logout
        </button>
      );
    } else {
      controls = (
        <div>
          <Register />
          <Login />
        </div>
      );
    }
    return (
      <div>
        <h1>Hello {name}</h1>
        {controls}
      </div>
    );
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
