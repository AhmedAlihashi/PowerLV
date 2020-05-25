import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

//used firebase proper b/c firestorter wont accept the global firebase file at root
import firebase from "firebase";
//firebase
import { initFirestorter, Collection } from "firestorter";
import { observer } from "mobx-react";
import "@firebase/firestore";

// init firestorter
initFirestorter({ firebase: firebase });

//Define collection
const users = new Collection("users");

const ScoreBoard = observer(
  class ScoreBoard extends Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      console.log(`users => ${users.docs.name}`);
    }
    render() {
      return (
        <ScrollView>
          {users.docs.map(doc => (
            <ScoreBoardEntries key={doc.id} doc={doc} />
          ))}
        </ScrollView>
      );
    }
  }
);

const ScoreBoardEntries = observer(({ doc }) => {
  const { name, currPowerLV } = doc.data;
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
});

const styles = StyleSheet.create({
  users: {
    flex: 1,
    justifyContent: "space-between"
  },
  container: {
    flexDirection: "row",
    padding: 10,
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    borderWidth: 2,
    borderRadius: 15,
    margin: 5,
    justifyContent: "space-around"
  },
  name: {
    alignSelf: "flex-start",
    fontSize: 30,
    marginRight: 40
  },
  powerlv: {
    fontSize: 20
  }
});

export default ScoreBoard;
