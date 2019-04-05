import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { customAlerts } from "../../actions/alertActions";

import Alert from "../../components/Alert/Alert";
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
    console.log(this.props);
    this.setState({
      isMobile: window.innerWidth < 770
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    } else if (!prevProps.auth.registerFail && this.props.auth.registerFail) {
      this.setState({
        email: "",
        password: "",
        confirm_password: ""
      });
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
    const { first_name, last_name, email, password } = this.state;

    if (first_name.length === 0 || last_name.length === 0) {
      const payload = {
        data: ["Some fields cannot be blank"]
      };
      console.log(this.props);
      console.log(customAlerts());
      customAlerts(payload);

      return false;
    }

    const userData = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password
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
          <Alert />
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
  customAlerts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser, customAlerts }
)(Landing);
