import React, { Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

import ScoreBoard from "../components/ScoreBoard";
import Chart from "../components/Chart";

export default class Stats extends Component {
  render() {
    return (
      <View style={styles.app}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate("Home")}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.chart}>
            <Text style={styles.titles}>Power Tracker</Text>
            <Chart />
          </View>
          <View style={styles.scoreBoard}>
            <Text style={styles.titles}>Rival Power Levels</Text>
            <ScoreBoard />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#BD6464"
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "space-around"
  },
  titles: {
    fontSize: 40
  },
  chart: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "rgba(112, 112, 112, 0.25)"
  },
  scoreBoard: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "rgba(112, 112, 112, 0.25)"
  }
});
