import React from "react";

import TextInput from "../../UI/TextInput/TextInput";
import fullCrown from "../../../assets/images/logo_full_crown.png";
import ProgressBar from "../../UI/ProgressBar/ProgressBar";
import classes from "./RewardForm.module.css";

const rewardForm = ({
  title,
  target,
  date,
  isFlipped,
  wasSubmitted,
  onSubmit,
  handleTextChange,
  handleFocus,
  handleBlur,
  focusedEl,
  showForm,
  handleSwitchForm
}) => {
  const addRewardContent = !wasSubmitted ? (
    <div className={classes.EmptyForm} onClick={handleSwitchForm}>
      <button type="button" className={classes.ShowForm}>
        &nbsp;
      </button>
    </div>
  ) : (
    <div>
      <img
        className={classes.CardLogo}
        src={fullCrown}
        alt="Meritokracy Crown Logo"
      />
      <div className={classes.Progress}>
        <ProgressBar width={0} />
      </div>
    </div>
  );
  return (
    <div className={classes.Card}>
      <div
        className={[classes.CardSide, classes.CardSideFront].join(" ")}
        style={
          isFlipped
            ? {
                transform: "rotateY(-180deg)",
                backgroundColor: "white"
              }
            : { backgroundColor: wasSubmitted ? "#9199b9" : "white" }
        }
      >
        {addRewardContent}
      </div>
      <div
        className={[classes.CardSide, classes.CardSideBack].join(" ")}
        style={isFlipped ? { transform: "rotateY(0)" } : {}}
      >
        <form onSubmit={onSubmit}>
          <div onClick={handleSwitchForm} className={classes.CloseFormWrapper}>
            <button type="button" className={classes.CloseForm} />
          </div>
          <TextInput
            type="text"
            value={title}
            name="title"
            handleChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isFocused={focusedEl === "title"}
          />
          <TextInput
            type="text"
            value={target}
            name="target"
            handleChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isFocused={focusedEl === "target"}
          />
          <TextInput
            type="text"
            value={date}
            name="date"
            handleChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isFocused={focusedEl === "date"}
          />
          <button
            type="submit"
            onClick={onSubmit}
            className={classes.AddButton}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default rewardForm;
