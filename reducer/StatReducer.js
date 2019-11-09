import { combineReducers } from "redux";

const initState = {
  Bench: "",
  Shoulder: "",
  Deadlift: "",
  Squat: ""
};

const statReducer = (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  stats: statReducer
});
