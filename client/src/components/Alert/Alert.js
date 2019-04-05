import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import classes from "./Alert.module.css";

class Alert extends Component {
  getStyles = () => {
    const { status } = this.props.alert;
    let alertType = null;
    if (status >= 200 && status < 300) {
      alertType = "success";
    } else if (status >= 300 && status <= 600) {
      alertType = "danger";
    } else {
      alertType = "notice";
    }
    switch (alertType) {
      case "success":
        return {
          icon: {
            elem: <i className="fas fa-check" style={{ color: "#66c148" }} />
          },
          iconStyle: {
            borderColor: "#66c148"
          },
          alertStyle: {
            backgroundColor: "#d4edda",
            borderBottomColor: "#66c148"
          }
        };
      case "notice":
        return {
          icon: {
            elem: (
              <i className="fas fa-exclamation" style={{ color: "#ffda68" }} />
            )
          },
          iconStyle: {
            borderColor: "#ffda68"
          },
          alertStyle: {
            backgroundColor: "#fff3cb",
            borderBottomColor: "#ffda68"
          }
        };
      case "danger":
      default:
        return {
          icon: {
            elem: <i className="fas fa-times" style={{ color: "#e84242" }} />
          },
          iconStyle: {
            borderColor: "#e84242"
          },
          alertStyle: {
            backgroundColor: "#f8d7da",
            borderBottomColor: "#ffb6be"
          }
        };
    }
  };

  render() {
    const { displayAlert, message } = this.props.alert;
    const { getStyles } = this;
    const { icon, iconStyle, alertStyle } = getStyles();

    return (
      <div
        style={{
          transform: displayAlert ? "translateY(0)" : "translateY(-120px)"
        }}
        className={classes.DefaultAlert}
      >
        <div className={[classes.Content].join(" ")} style={alertStyle}>
          <p>{message.join(", ")}</p>
          <div style={iconStyle}>{icon.elem}</div>
        </div>
      </div>
    );
  }
}

Alert.propTypes = {
  alert: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
