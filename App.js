import * as React from "react";

import HomeScreen from "./screens/Home";
import StatScreen from "./screens/Stats";

// Navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Stats: StatScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
