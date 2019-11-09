//init context
import React, { Component, createContext } from "react";

export const StatsContext = createContext();

export default class StatsProvider extends Component {
  state = {
    Bench: "",
    Shoulder: "",
    Deadlift: "",
    Squat: ""
  };

  render() {
    return (
      <StatsContext.Provider
        value={{
          Bench: state.Bench,
          Shoulder: state.ShoulderPress,
          Deadlift: state.Deadlift,
          Squat: state.Squat
        }}
      >
        {this.props.children}
      </StatsContext.Provider>
    );
  }
}
