import React from "react";

import crownLogo from "../../assets/images/logo_full_crown.png";
import lineLogo from "../../assets/images/logo_line_crown.png";
import classes from "./Navigation.module.css";

const navigation = () => {
  const user = {
    first_name: "Nathan",
    last_name: "saunders"
  };
  return (
    <nav className={classes.Nav}>
      <div className={classes.Logo}>
        <img
          src={crownLogo}
          className={classes.LogoImg}
          alt={"Meritokracy crown logo"}
        />
      </div>
      <div className={classes.UserLinkWrapper}>
        <div className={classes.User}>
          <p className={classes.UserProfileText}>
            {user.first_name} {user.last_name}
            <i className="fa fa-caret-down" />
          </p>
          <div className={classes.UserProfile}>
            <img
              src={lineLogo}
              className={classes.LogoImg}
              alt={"User avatar"}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default navigation;
