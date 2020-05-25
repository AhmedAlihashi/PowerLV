import React, { memo } from "react";
import { View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import { Text } from "react-native";

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>PowerLV Login</Header>

    <Paragraph>Welcome To PowerLV </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate("RegisterScreen")}
    >
      Sign Up
    </Button>
    <Text>An app by Ahmed Ali</Text>
  </Background>
);

export default memo(HomeScreen);
