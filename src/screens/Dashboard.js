import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { logoutUser } from "../api/auth-api";

//firebase
import firebase from "../../firebase";
import "firebase/auth";

import DataInput from "../components/DataInput";
import Button from "../components/Button";

const Dashboard = ({ navigation }) => (
  <View style={styles.app}>
    {/* Title */}
    <View style={styles.title}>
      <Text style={styles.titleText}>PowerLV</Text>
      <Text>Welcome back {firebase.auth().currentUser.displayName} </Text>
    </View>
    <View style={styles.container}>
      {/* Input */}
      <Text style={{ textAlign: "center", fontSize: 30 }}>
        Enter your stats
      </Text>
      <Button mode="outlined" onPress={() => logoutUser()}>
        Logout
      </Button>
      <View style={styles.input}>
        <DataInput navigation={navigation} />
      </View>
    </View>
  </View>
);

export default memo(Dashboard);

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
