import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";

//firebase
import firebase from "../../firebase";
import "@firebase/firestore";
import "firebase/auth";
const db = firebase.firestore();

class ScoreBoard2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Rivals: []
    };
  }

  componentDidMount() {
    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ Rivals: doc.data().Rivals });
          console.log(this.state.Rivals);
        });
      });
  }

  render() {
    return (
      <ScrollView>
        <RivalEntries />
      </ScrollView>
    );
  }
}

const RivalEntries = () => {
  return (
    <View style={styles.users}>
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View>
          <Text style={styles.powerlv}>{currPowerLV}</Text>
        </View>
      </View>
    </View>
  );
};

export default ScoreBoard2;
