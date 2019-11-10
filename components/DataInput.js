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
            <Text style={styles.titleText}>Bench</Text>
          </View>
          <View style={styles.value}>
            <TextInput
              placeholder="Bench Press"
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
              placeholder="Shoulder Press"
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
              placeholder="Deadlift"
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
              placeholder="Squat"
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
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 10,
    flex: 1
  },
  title: {
    backgroundColor: "silver",
    alignItems: "center",
    justifyContent: "center",
    flex: 2
  },
  titleText: {
    fontSize: 30
  },
  value: {
    margin: 10,
    backgroundColor: "pink",
    flex: 1
  },
  calculate: {
    flex: 3,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10
  }
});
