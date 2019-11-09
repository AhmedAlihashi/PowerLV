import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";

export default class DataInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Bench: "",
      ShoulderPress: "",
      Deadlift: "",
      Squat: "",
      Compute: null
    };
    this.Compute = this.Compute.bind(this);
  }

  componentDidMount() {}

  Calculate() {
    let numArr = [];
    numArr.push();
    Alert.alert(numArr);
  }

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
              onChangeText={Bench => this.setState({ Bench })}
              value={this.state.Bench}
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
              onChangeText={ShoulderPress => this.setState({ ShoulderPress })}
              value={this.state.ShoulderPress}
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
              value={this.state.Deadlift}
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
              value={this.state.Squat}
              keyboardType={"numeric"}
            />
          </View>
        </View>
        {/**button */}
        <View style={styles.Button}>
          <Button title="Calculate" onPress={this.Calculate} />
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
    flex: 3
  },
  titleText: {
    fontSize: 30
  },
  value: {
    margin: 10,
    backgroundColor: "pink",
    flex: 1
  },
  Button: {
    paddingTop: 20
  }
});
