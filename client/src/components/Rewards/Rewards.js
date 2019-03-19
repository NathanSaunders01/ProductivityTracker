import React, { Component } from "react";

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
          width: 86,
          hasLoaded: false
        },
        {
          id: 2,
          title: "Buy myself a pair of trainers",
          xp_target: 4800,
          isFlipped: false,
          width: 74,
          hasLoaded: false
        },
        {
          id: 3,
          title: "Weekend away in the Quantocks",
          xp_target: 7200,
          isFlipped: false,
          width: 63,
          hasLoaded: false
        },
        {
          id: 4,
          title: "Holiday in Corisca",
          xp_target: 12000,
          isFlipped: false,
          width: 41,
          hasLoaded: false
        },
        {
          id: 5,
          title: "Buy a new car",
          xp_target: 24000,
          isFlipped: false,
          width: 26,
          hasLoaded: false
        }
      ],
      flippedIndex: 0,
      loadedIndex: 0
    };
  }

  componentWillUnmount() {
    clearInterval(this.loadInterval);
    clearInterval(this.flipInterval);
  }

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

  render() {
    const { rewardList } = this.state;
    return (
      <div className={classes.Container}>
        <div className={classes.Header}>
          <h4>Rewards</h4>
        </div>
        <div className={classes.Content}>
          <RewardList rewardList={rewardList} />
          <button
            type="button"
            className={classes.FlipButton}
            onClick={this.onFlipCards}
          >
            Flip Cards
          </button>
        </div>
      </div>
    );
  }
}

export default Rewards;
