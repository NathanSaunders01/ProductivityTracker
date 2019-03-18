import React from "react";

import classes from "./BackDrop.module.css";

const backDrop = ({ show, clicked }) =>
  show ? <div className={classes.Backdrop} onClick={clicked} /> : null;

export default backDrop;
