import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addReward } from "../../actions/rewardActions";

import RewardList from "./RewardList/RewardList";
import classes from "./Rewards.module.css";

class Rewards extends Component {
  constructor() {
    super();

    this.state = {
      rewardList: [
        {
          id: 1,
          title: "Go out for dinner",
          xp_target: 3200,
          isFlipped: false,
          date: "14/04/2019",
          width: 86
        },
        {
          id: 2,
          title: "Buy myself a pair of trainers",
          xp_target: 4800,
          isFlipped: false,
          date: "30/04/2019",
          width: 74
        },
        {
          id: 3,
          title: "Weekend away in the Quantocks",
          xp_target: 7200,
          isFlipped: false,
          date: "04/05/2019",
          width: 63
        },
        {
          id: 4,
          title: "Holiday in Corisca",
          xp_target: 12000,
          isFlipped: false,
          date: "20/06/2019",
          width: 41
        },
        {
          id: 5,
          title: "Buy a new car",
          xp_target: 24000,
          isFlipped: false,
          date: "24/06/2019",
          width: 26
        }
      ],
      flippedIndex: 0,
      loadedIndex: 0,
      hasOverflow: false,
      showForm: false,
      title: "",
      target: "",
      date: "",
      isFlipped: false,
      wasSubmitted: false,
      focusedEl: null
    };
  }

  componentDidMount() {
    const hasOverflow = this.checkForOverflow();
    this.setState({
      hasOverflow: hasOverflow
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.rewardList &&
      prevState.rewardList.length < this.state.rewardList.length
    ) {
      this.onScrollFormIntoView();
    }
  }

  componentWillUnmount() {
    clearInterval(this.loadInterval);
    clearInterval(this.flipInterval);
  }

  onScrollFormIntoView = () => {
    this.rewardEnd.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, target, date } = this.state;
    const { addReward } = this.props;

    const rewardData = {
      id: 6,
      title,
      xp_target: target,
      date: date
    };

    // Trigger flip of card
    this.setState(
      {
        isFlipped: false,
        wasSubmitted: true
      },
      () => {
        // addReward(rewardData);
        // Slide across to new form
        this.setState(prevState => {
          return {
            ...prevState,
            rewardList: prevState.rewardList.concat(rewardData),
            wasSubmitted: false
          };
        });
      }
    );
  };

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

  switchAddRewardForm = () => {
    this.setState(
      prevState => {
        return {
          title: prevState.showForm ? "" : prevState.title,
          target: prevState.showForm ? "" : prevState.target,
          date: prevState.showForm ? "" : prevState.date,
          focusedEl: prevState.showForm ? null : prevState.focusedEl,
          showForm: !prevState.showForm,
          isFlipped: !prevState.isFlipped
        };
      },
      () => {
        if (this.state.showForm) {
          this.onScrollFormIntoView();
        }
      }
    );
  };

  onLoadProgressBars = () => {
    this.setState(prevState => {
      return {
        rewardList: prevState.rewardList.map((reward, index) => {
          if (index === 0) {
            return {
              ...reward,
              hasLoaded: true
            };
          } else {
            return reward;
          }
        }),
        loadedIndex: 1
      };
    });
    this.loadInterval = setInterval(this.loadProgress, 250);
  };

  loadProgress = () => {
    this.setState(
      prevState => {
        return {
          rewardList: prevState.rewardList.map((reward, index) => {
            if (index === prevState.loadedIndex) {
              return {
                ...reward,
                hasLoaded: true
              };
            } else {
              return reward;
            }
          }),
          loadedIndex: (prevState.loadedIndex += 1)
        };
      },
      () => {
        if (this.state.loadedIndex === this.state.rewardList.length) {
          clearInterval(this.loadInterval);
        }
      }
    );
  };

  onFlipCards = () => {
    this.setState(prevState => {
      return {
        rewardList: prevState.rewardList.map((reward, index) => {
          if (index === 0) {
            return {
              ...reward,
              isFlipped: !reward.isFlipped
            };
          } else {
            return reward;
          }
        }),
        flippedIndex: 1
      };
    });
    this.flipInterval = setInterval(this.flip, 200);
  };

  flip = () => {
    this.setState(
      prevState => {
        return {
          rewardList: prevState.rewardList.map((reward, index) => {
            if (index === prevState.flippedIndex) {
              return {
                ...reward,
                isFlipped: !reward.isFlipped
              };
            } else {
              return reward;
            }
          }),
          flippedIndex: (prevState.flippedIndex += 1)
        };
      },
      () => {
        if (this.state.flippedIndex === this.state.rewardList.length) {
          clearInterval(this.flipInterval);
        }
      }
    );
  };

  checkForOverflow = () => {
    const { rewardList } = this.state;

    return this.rewardContainer
      ? this.rewardContainer.clientWidth < rewardList.length * 260
      : false;
  };

  setContainerRef = rewardContainer => {
    this.rewardContainer = rewardContainer;
  };

  setLastRef = rewardEnd => {
    this.rewardEnd = rewardEnd;
  };

  render() {
    const {
      rewardList,
      hasOverflow,
      title,
      date,
      target,
      focusedEl,
      isFlipped,
      showForm,
      wasSubmitted
    } = this.state;
    const {
      onSubmit,
      handleTextChange,
      handleFocus,
      handleBlur,
      switchAddRewardForm,
      setContainerRef,
      setLastRef,
      onFlipCards
    } = this;
    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <h4>Rewards</h4>
        </div>
        <div className={classes.Content}>
          <RewardList
            setRef={setContainerRef}
            setLastRef={setLastRef}
            rewardList={rewardList}
            hasOverflow={hasOverflow}
            showForm={showForm}
            title={title}
            date={date}
            target={target}
            focusedEl={focusedEl}
            isFlipped={isFlipped}
            wasSubmitted={wasSubmitted}
            onSubmit={onSubmit}
            handleTextChange={handleTextChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            handleSwitchForm={switchAddRewardForm}
          />
          <button
            type="button"
            className={classes.FlipButton}
            onClick={onFlipCards}
          >
            Flip Cards
          </button>
        </div>
      </div>
    );
  }
}

Rewards.propTypes = {
  addReward: PropTypes.func.isRequired,
  rewardList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  rewardList: state.reward.rewardList
});

export default connect(
  mapStateToProps,
  { addReward }
)(Rewards);
