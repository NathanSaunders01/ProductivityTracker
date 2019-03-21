import React from "react";

import classes from "./Header.module.css";
import Login from "../Login/Login";
import Nature from "../../../assets/images/nature.jpg";
import LineCrown from "../../../assets/images/logo_line_crown.png";

const header = ({
  switchLoginForm,
  scrollToForm,
  showLogin,
  submitLogin,
  handleTextChange,
  handleFocus,
  handleBlur,
  email,
  password,
  focusedEl,
  isLoggingIn
}) => {
  return (
    <header
      className={classes.Header}
      style={{
        backgroundImage: `linear-gradient(to right bottom, rgba(77, 120, 160, 0.8), rgba(16, 12, 47, 0.8)), url(${Nature})`
      }}
    >
      <div className={classes.HeaderLogin}>
        <div className={classes.HeaderLoginWrapper}>
          <p
            onClick={switchLoginForm}
            className={
              showLogin ? classes.HeaderLoginTextOpen : classes.HeaderLoginText
            }
          >
            Log In
          </p>
          <Login
            email={email}
            password={password}
            showLogin={showLogin}
            submitLogin={submitLogin}
            handleTextChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            focusedEl={focusedEl}
            isLoggingIn={isLoggingIn}
          />
        </div>
      </div>
      <div className={classes.HeaderLogoBox}>
        <img
          src={LineCrown}
          className={[classes.HeaderLogo, classes.LogoAnimated].join(" ")}
          alt="Meritokracy crown logo"
        />
      </div>
      <div className={classes.HeaderTextBox}>
        <h1 className={classes.HeadingPrimary}>
          <span className={classes.HeadingPrimaryMain}>Meritokracy</span>
          <span className={classes.HeadingPrimarySub}>
            Powered by positive feedback loops
          </span>
        </h1>

        <p
          onClick={scrollToForm}
          className={[classes.Button, classes.ButtonWhite].join(" ")}
        >
          Sign up
        </p>

        <div className={classes.HeaderSmall}>
          <span>manage</span>
          <span>motivate</span>
          <span>master</span>
          <span>merit</span>
        </div>
      </div>
    </header>
  );
};

export default header;
