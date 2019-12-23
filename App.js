import "./fixtimerbug";
import * as React from "react";

//might use later
//import { Dimensions } from "react-native";
//const screenWidth = Dimensions.get("window").width;

import {
  StatsScreen,
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  AuthLoadingScreen,
  Dashboard
} from "./src/screens";

// Navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

const RootStack = createStackNavigator(
  {
    StatsScreen,
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    AuthLoadingScreen
  },
  {
    initialRouteName: "AuthLoadingScreen",
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
