import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default class Stats extends Component {
  render() {
    return (
      <View style={styles.app}>
        <Text>Stats Screen</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Home")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#BD6464",
    padding: 20
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  title: {
    alignItems: "center",
    paddingBottom: 15
  },
  titleText: {
    fontSize: 85
  },
  input: {
    flex: 3,
    backgroundColor: "gray",
    padding: 10
  }
});
