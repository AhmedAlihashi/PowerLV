import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import DataInput from "../components/DataInput";

export class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.app}>
        {/* Title */}
        <View style={styles.title}>
          <Text style={styles.titleText}>PowerLV</Text>
          <Text>Welcome back</Text>
        </View>
        <View style={styles.container}>
          {/* Input */}
          <View style={styles.input}>
            <Text style={{ textAlign: "center" }}>Enter your stats</Text>
            <DataInput navigation={this.props.navigation} />
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;

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
