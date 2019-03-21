import React from "react";

import RewardItem from "./RewardItem/RewardItem";
import RewardForm from "../RewardForm/RewardForm";
import classes from "./RewardList.module.css";

const rewardList = ({
  rewardList,
  setRef,
  setLastRef,
  hasOverflow,
  title,
  target,
  date,
  focusedEl,
  isFlipped,
  wasSubmitted,
  onSubmit,
  handleTextChange,
  handleFocus,
  handleBlur,
  showForm,
  handleSwitchForm
}) => {
  const rewardItems = rewardList
    .map(item => <RewardItem key={item.id} item={item} />)
    .concat([
      <RewardForm
        title={title}
        target={target}
        date={date}
        focusedEl={focusedEl}
        isFlipped={isFlipped}
        wasSubmitted={wasSubmitted}
        onSubmit={onSubmit}
        handleTextChange={handleTextChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        showForm={showForm}
        handleSwitchForm={handleSwitchForm}
        key={"0000"}
      />,
      <div
        key={"000"}
        ref={setLastRef}
        style={{ minWidth: "1px", height: "180px" }}
      />
    ]);
  return (
    <div
      className={classes.List}
      style={{
        justifyContent: hasOverflow ? "flex-start" : "space-between"
      }}
      ref={setRef}
    >
      {rewardItems}
    </div>
  );
};

export default rewardList;
