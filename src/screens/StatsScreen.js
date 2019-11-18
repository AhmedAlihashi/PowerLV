import React, { memo, Component } from "react";
import { Button, View, Text, StyleSheet } from "react-native";

import Chart from "../components/Chart";
import ScoreBoard from "../components/ScoreBoard";

//firebase
import firebase from "../../firebase";
import "@firebase/firestore";
import "firebase/auth";
const db = firebase.firestore();

class StatsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currpowerlv: 0
    };
  }
  componentDidMount() {
    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ data: doc.data().prevPowerLV });
          console.log(this.state.data);
          let tempArr = doc.data().prevPowerLV;
          let lastElement = tempArr[tempArr.length - 1];
          this.setState({ currpowerlv: lastElement });
        });
      });
  }
  render() {
    return (
      <View style={styles.app}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate("Dashboard")}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.chart}>
            <Text style={styles.titles}>Power Tracker</Text>
            <Text style={{ fontSize: 15, color: "white", margin: 0 }}>
              Current PowerLV: {this.state.currpowerlv}
            </Text>
            <Chart />
          </View>
          <View style={styles.scoreBoard}>
            <Text style={styles.titles}>Rival Power Levels</Text>
            <ScoreBoard style={{ flex: 1 }} />
          </View>
        </View>
      </View>
    );
  }
}
export default memo(StatsScreen);

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
    margin: 5,
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
