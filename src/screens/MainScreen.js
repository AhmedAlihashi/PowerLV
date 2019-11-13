import React, { memo, Component } from "react";
import { View, Text, StyleSheet } from "react-native";

import DataInput from "../components/DataInput";

class MainScreen extends Component {
  render() {
    return (
      <View style={styles.app}>
        {/* Title */}
        <View style={styles.title}>
          <Text style={styles.titleText}>PowerLV</Text>
          <Text>Welcome back </Text>
        </View>
        <View style={styles.container}>
          {/* Input */}
          <Text style={{ textAlign: "center", fontSize: 30 }}>
            Enter your stats
          </Text>
          <View style={styles.input}>
            <DataInput navigation={this.props.navigation} />
          </View>
        </View>
      </View>
    );
  }
}

export default memo(MainScreen);

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
    padding: 10
  }
});
