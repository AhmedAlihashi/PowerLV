import React, { memo, Component } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { logoutUser } from "../api/auth-api";

//firebase
import firebase from "../../firebase";
import "firebase/auth";

import DataInput from "../components/DataInput";

const Dashboard = ({ navigation }) => (
  <View style={styles.app}>
    {/* Title */}
    <View style={styles.title}>
      <Text style={styles.titleText}>PowerLV</Text>
      <UserInfo />
    </View>
    <View style={styles.container}>
      {/* Input */}
      <Text style={{ textAlign: "center", fontSize: 30 }}>
        Enter your stats
      </Text>
      <Button title="Logout" color="#64BDBD" onPress={() => logoutUser()} />
      <View style={styles.input}>
        <DataInput navigation={navigation} />
      </View>
    </View>
  </View>
);

export default memo(Dashboard);

const db = firebase.firestore();

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      friendCode: 0
    };
  }

  componentDidMount() {
    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            userName: doc.data().name,
            friendCode: doc.data().friendCode
          });
        });
      });
  }
  render() {
    const { userName, friendCode } = this.state;
    return (
      <View>
        <Text style={styles.userText}>
          Welcome Back:
          <Text style={{ color: "white" }}> {userName}</Text>
        </Text>
        <Text style={styles.userText}>
          Friend Code:
          <Text style={{ color: "white" }}> {friendCode}</Text>
        </Text>
      </View>
    );
  }
}

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
  userText: {
    textAlign: "center"
  },
  input: {
    flex: 3,
    padding: 10
  }
});
