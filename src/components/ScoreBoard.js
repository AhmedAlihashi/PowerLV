import React, { Component, Fragment } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

//firebase
import { initFirestorter, Collection } from "firestorter";
import { observer } from "mobx-react";
import firebase from "../../firebase";

import { firebaseConfig } from "../core/config";

const db = firebase.firestore();

//Define collection
const users = db.collection("users");

const ScoreBoard = observer(
  class ScoreBoard extends Component {
    render() {
      return (
        <Fragment>
          <ScrollView>
            {users.docs.map(doc => (
              <ScoreBoardEntries key={doc.id} doc={doc} />
            ))}
          </ScrollView>
        </Fragment>
      );
    }
  }
);

const ScoreBoardEntries = observer(({ doc }) => {
  const { name, powerlv } = doc.data;
  return (
    <View style={styles.users}>
      <View style={styles.container}>
        <View>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View>
          <Text style={styles.powerlv}>{powerlv}</Text>
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
