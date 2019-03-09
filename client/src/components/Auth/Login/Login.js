import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";

import TextInput from "../../UI/TextInput/TextInput";

import classes from "../Form.module.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      focusedEl: null
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(userData);
    this.props.loginUser(userData);
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
      focusedEl: name
    });
  };

  handleBlur = e => {
    this.setState({
      focusedEl: null
    });
  };

  render() {
    return (
      <div className="App">
        <h4>Login</h4>
        <form onSubmit={this.onSubmit} className={classes.FormGroup}>
          <TextInput
            type="email"
            value={this.state.email}
            name="email"
            handleChange={this.handleTextChange}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
            isFocused={this.state.focusedEl === "email"}
          />
          <TextInput
            type="password"
            value={this.state.password}
            name="password"
            handleChange={this.handleTextChange}
            handleFocus={this.handleFocus}
            handleBlur={this.handleBlur}
            isFocused={this.state.focusedEl === "password"}
          />
          <input type="submit" value="Submit" onClick={this.onSubmit} />
        </form>
      </div>
    );
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
