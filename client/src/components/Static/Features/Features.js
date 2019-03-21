import React from "react";

import classes from "./Features.module.css";

const features = () => {
  return (
    <section className={classes.Features}>
      <div className="u-center-text u-margin-bottom-big">
        <h1 className={classes.HeadingSecondary}>How it works</h1>
      </div>
      <div className={classes.Row}>
        <div
          className={[classes.FeatureBox, "u-margin-bottom-small"].join(" ")}
        >
          <i
            className={[classes.FeatureBoxIcon, "fa", "fa-3x", "fa-list"].join(
              " "
            )}
          />
          <h3
            className={[classes.HeadingTertiary, "u-margin-bottom-small"].join(
              " "
            )}
          >
            Manage to-do list
          </h3>
          <p className={classes.FeatureBoxText}>
            Keep on top of all your commitments and earn points as they're
            ticked off. Make sure you assign yourself more points for the less
            appealing ones...
          </p>
        </div>
        <div
          className={[classes.FeatureBox, "u-margin-bottom-small"].join(" ")}
        >
          <i
            className={[classes.FeatureBoxIcon, "fa", "fa-chart-line"].join(
              " "
            )}
          />
          <h3
            className={[classes.HeadingTertiary, "u-margin-bottom-small"].join(
              " "
            )}
          >
            Track and develop habits
          </h3>
          <p className={classes.FeatureBoxText}>
            Log activities you want to make a habit of and set the number of
            times per week you'll complete it. If you hit it, you'll earn bonus
            points the following week.
          </p>
        </div>
        <div
          className={[classes.FeatureBox, "u-margin-bottom-small"].join(" ")}
        >
          <i
            className={[classes.FeatureBoxIcon, "far", "fa-clock"].join(" ")}
          />
          <h3
            className={[classes.HeadingTertiary, "u-margin-bottom-small"].join(
              " "
            )}
          >
            Boost producivity
          </h3>
          <p className={classes.FeatureBoxText}>
            Visualise your progress and stay driven to unlock more rewards on
            your dashboard. You might find that producivity itself is the reward
            you were striving for.
          </p>
        </div>
        <div
          className={[classes.FeatureBox, "u-margin-bottom-small"].join(" ")}
        >
          <i
            className={[classes.FeatureBoxIcon, "fa", "fa-trophy"].join(" ")}
          />
          <h3
            className={[classes.HeadingTertiary, "u-margin-bottom-small"].join(
              " "
            )}
          >
            Earn a sense of merit
          </h3>
          <p className={classes.FeatureBoxText}>
            Harness the power of the positive feedback loop to engrain a
            producutive lifestyle. There's nothing quite like a guilty pleasure
            after a busy day.
          </p>
        </div>
      </div>
    </section>
  );
};

export default features;
