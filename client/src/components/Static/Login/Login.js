import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { loginUser } from "../../../actions/authActions";
import TextInput from "../../UI/TextInput/TextInput";
import classes from "./Login.module.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      focusedEl: ""
    };
  }

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
      focusedEl: name
    });
  };

  handleBlur = e => {
    this.setState({
      focusedEl: null
    });
  };

  submitLogin = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(userData);
    this.props.loginUser(userData);
  };

  render() {
    const { showLogin, isLoggingIn } = this.props;
    const { email, password, focusedEl } = this.state;
    const { handleTextChange, handleFocus, handleBlur, submitLogin } = this;
    const btnText = isLoggingIn ? "Logging in..." : "Login";
    const form = showLogin ? (
      <form
        onSubmit={submitLogin}
        className={showLogin ? classes.LoginForm : null}
      >
        <TextInput
          type="email"
          value={email}
          name="email"
          handleChange={handleTextChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isFocused={focusedEl === "email"}
        />
        <TextInput
          type="password"
          value={password}
          name="password"
          handleChange={handleTextChange}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isFocused={focusedEl === "password"}
        />
        <button
          type="button"
          className={classes.LoginButton}
          onClick={submitLogin}
          disabled={isLoggingIn}
        >
          {btnText}
        </button>
      </form>
    ) : null;
    return <div>{form}</div>;
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
