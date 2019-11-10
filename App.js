import React from "react";

import Home from "./screens/Home";
import Stats from "./screens/Stats";

import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator({
  Profile: {
    screen: Home,
    screen: Stats
  }
});

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
