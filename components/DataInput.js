import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default class DataInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Bench: 0,
      ShoulderPress: 0,
      Deadlift: 0,
      Squat: 0,
      results: 0
    };
  }

  handleCalculate = () => {
    const { Bench, ShoulderPress, Deadlift, Squat } = this.state;
    let average =
      (parseInt(Bench) +
        parseInt(ShoulderPress) +
        parseInt(Deadlift) +
        parseInt(Squat)) /
      4;

    this.setState({ results: average });
  };

  render() {
    return (
      <View style={styles.DataInput}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Bench Press</Text>
          </View>
          <View style={styles.value}>
            <TextInput
              style={{ alignSelf: "center" }}
              placeholder="Enter data here"
              placeholderTextColor="rgba(36, 33, 43, 0.5)"
              onChangeText={Bench => this.setState({ ...this.state, Bench })}
              keyboardType={"numeric"}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Shoulder Press</Text>
          </View>
          <View style={styles.value}>
            <TextInput
              style={{ alignSelf: "center" }}
              placeholder="Enter data here"
              placeholderTextColor="rgba(36, 33, 43, 0.5)"
              onChangeText={ShoulderPress =>
                this.setState({ ...this.state, ShoulderPress })
              }
              keyboardType={"numeric"}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Deadlift</Text>
          </View>
          <View style={styles.value}>
            <TextInput
              style={{ alignSelf: "center" }}
              placeholder="Enter data here"
              placeholderTextColor="rgba(36, 33, 43, 0.5)"
              onChangeText={Deadlift => this.setState({ Deadlift })}
              keyboardType={"numeric"}
            />
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}>Squat</Text>
          </View>
          <View style={styles.value}>
            <TextInput
              style={{ alignSelf: "center" }}
              placeholder="Enter data here"
              placeholderTextColor="rgba(36, 33, 43, 0.5)"
              onChangeText={Squat => this.setState({ Squat })}
              keyboardType={"numeric"}
            />
          </View>
        </View>
        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <Button
            title="Stats"
            onPress={() => this.props.navigation.navigate("Stats")}
          />
          <Button title="Calculate" onPress={this.handleCalculate} />
        </View>
        {/*calc*/}
        <View style={styles.calculate}>
          <Text style={{ fontSize: 35 }}>Your Power Level is</Text>
          <Text style={{ fontSize: 65 }}>{this.state.results}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  DataInput: {
    flex: 1,
    justifyContent: "space-around"
  },
  container: {
    flexDirection: "row",
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    borderWidth: 2,
    borderRadius: 15,
    margin: 5
  },
  title: {
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    borderWidth: 2,
    borderRadius: 10
  },
  titleText: {
    fontSize: 23
  },
  value: {
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    height: 40,
    padding: 2
  },
  calculate: {
    flex: 3,
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 15
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10
  }
});
