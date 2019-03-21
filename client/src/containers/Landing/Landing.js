import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

import Login from "../../components/Static/Login/Login";
import Header from "../../components/Static/Header/Header";
import Features from "../../components/Static/Features/Features";
import Register from "../../components/Static/Register/Register";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Landing.module.css";

class Landing extends Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      focusedEl: "",
      showLogin: false,
      isMobile: false
    };
  }

  componentDidMount() {
    this.setState({
      isMobile: window.innerWidth < 770
    });
  }

  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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

  logoutHandler = () => {
    this.props.logoutUser();
  };

  submitRegister = e => {
    e.preventDefault();
    const userData = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password
    };

    console.log(userData);
    this.props.registerUser(userData);
  };

  setRegisterRef = registerSection => {
    this.registerSection = registerSection;
  };

  switchLoginForm = () => {
    this.setState(prevState => {
      return {
        showLogin: !prevState.showLogin
      };
    });
  };

  scrollToForm = () => {
    this.registerSection.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };

  render() {
    const {
      first_name,
      last_name,
      email,
      password,
      confirm_password,
      focusedEl,
      showLogin,
      isMobile
    } = this.state;
    const {
      handleTextChange,
      handleFocus,
      handleBlur,
      scrollToForm,
      setRegisterRef,
      switchLoginForm,
      submitLogin,
      submitRegister
    } = this;
    const { isRegistering, isLoading, isLoggingIn } = this.props.auth;
    let content = (
      <div className={classes.LoadingContainer}>
        <Spinner />
      </div>
    );
    if (!isLoading) {
      content = (
        <div>
          <Login />
          <Header
            email={email}
            password={password}
            focusedEl={focusedEl}
            handleTextChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            scrollToForm={scrollToForm}
            switchLoginForm={switchLoginForm}
            showLogin={showLogin}
            submitLogin={submitLogin}
            isLoggingIn={isLoggingIn}
          />
          <Features />
          <Register
            first_name={first_name}
            last_name={last_name}
            email={email}
            password={password}
            confirm_password={confirm_password}
            focusedEl={focusedEl}
            handleTextChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            submitRegister={submitRegister}
            setRef={setRegisterRef}
            isRegistering={isRegistering}
            isMobile={isMobile}
          />
        </div>
      );
    }
    return <div>{content}</div>;
  }
}

Landing.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Landing);
