import React from "react";

import classes from "./Register.module.css";
import Sea from "../../../assets/images/sea.jpg";
import TextInput from "../../UI/TextInput/TextInput";

const register = ({
  password,
  first_name,
  last_name,
  email,
  confirm_password,
  handleTextChange,
  handleFocus,
  handleBlur,
  focusedEl,
  submitRegister,
  setRef,
  isRegistering,
  isMobile
}) => {
  const btnText = !isRegistering ? "Register" : "Registering...";
  const bgImgPercent = isMobile ? 100 : 50;
  return (
    <div className={classes.SignUpContainer} ref={setRef}>
      <div
        className={classes.SignUp}
        style={{
          backgroundImage: `linear-gradient(105deg, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.7) ${bgImgPercent}%, transparent 50%), url(${Sea})`
        }}
      >
        <div className={classes.SignUpForm}>
          <form className={classes.Form} onSubmit={submitRegister}>
            <div className="u-margin-bottom-med">
              <h1 className={classes.HeadingSecondary}>Sign up now</h1>
            </div>

            <div className={[classes.FormGroup, classes.Name].join(" ")}>
              <div className={classes.FormGroupFirstName}>
                <TextInput
                  type="text"
                  value={first_name}
                  name="first_name"
                  handleChange={handleTextChange}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  isFocused={focusedEl === "first_name"}
                />
              </div>
              <div className={classes.FormGroupLastName}>
                <TextInput
                  type="text"
                  value={last_name}
                  name="last_name"
                  handleChange={handleTextChange}
                  handleFocus={handleFocus}
                  handleBlur={handleBlur}
                  isFocused={focusedEl === "last_name"}
                />
              </div>
            </div>
            <div className={classes.FormGroup}>
              <TextInput
                type="email"
                value={email}
                name="email"
                handleChange={handleTextChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                isFocused={focusedEl === "email"}
              />
            </div>

            <div className={classes.FormGroup}>
              <TextInput
                type="password"
                value={password}
                name="password"
                handleChange={handleTextChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                isFocused={focusedEl === "password"}
              />
            </div>

            <div className={classes.FormGroup}>
              <TextInput
                type="password"
                value={confirm_password}
                name="confirm_password"
                handleChange={handleTextChange}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                isFocused={focusedEl === "confirm_password"}
              />
            </div>

            <div className={classes.FormGroup} ref={setRef}>
              <button
                onClick={submitRegister}
                type="submit"
                className={classes.SubmitButton}
                disabled={isRegistering}
              >
                {btnText}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
