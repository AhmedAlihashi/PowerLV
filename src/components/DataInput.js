import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

//firebase
import firebase from "../../firebase";
import "@firebase/firestore";
import "firebase/auth";
const db = firebase.firestore();

export default class DataInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Bench: 0,
      Deadlift: 0,
      Squat: 0,
      results: 0,
      show: false,
      numArr: []
    };
  }

  componentDidMount() {
    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ numArr: doc.data().prevPowerLV });
          console.log(`mount arry value ${this.state.numArr}`);
        });
      });
  }
  // to fix the duplicates issue, read current array in db, add new data,
  // and push new array to db
  handleSubmit = () => {
    const { results, numArr } = this.state;
    levelArr = db.collection("users").doc(firebase.auth().currentUser.uid);

    numArr.push(Number(results));
    levelArr.set({ prevPowerLV: numArr }, { merge: true });
    this.setState({ show: false });

    console.log(`local new array ${numArr}`);
  };

  handleCalculate = () => {
    const { Bench, Deadlift, Squat } = this.state;
    let average = (parseInt(Bench) + parseInt(Deadlift) + parseInt(Squat)) / 3;

    this.setState({ show: true, results: average.toFixed(2) });
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
            onPress={() => this.props.navigation.navigate("StatsScreen")}
          />
          {this.state.show ? (
            <Button
              title="Submit"
              color="#19c47d"
              onPress={this.handleSubmit}
            />
          ) : null}
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
    justifyContent: "space-between",
    margin: 10
  }
});
