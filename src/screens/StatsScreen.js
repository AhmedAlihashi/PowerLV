import React, { memo, Component } from "react";
import {
  ScrollView,
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableOpacity
} from "react-native";

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
      currpowerlv: 0,
      friendCode: 0,
      searchedRivalName: "",
      searchedRivalPWR: 0,
      codeArr: [],
      rivals: [],
      userSearch: false
    };
  }
  componentDidMount() {
    const { codeArr } = this.state;

    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({
            data: doc.data().prevPowerLV,
            rivals: doc.data().rivals
          });

          let tempArr = doc.data().prevPowerLV;
          let lastElement = tempArr[tempArr.length - 1];
          this.setState({
            currpowerlv: lastElement
          });
          let z = doc.data().rivals;
          console.log(z);
        });
      });

    db.collection("friendCodes")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          codeArr.push(doc.id);
        });
      });
  }

  searchFriends = async () => {
    // friendCode is the current code typed in
    // friends is the array that stores all the friends
    const { friendCode, codeArr, userSearch } = this.state;
    console.log(`All Rivals: ${this.state.rivals}`);

    console.log(`Friend code entered ${friendCode} FriendCodes ${codeArr}`);

    if (codeArr.includes(friendCode)) {
      await db
        .collection("users")
        .where("friendCode", "==", parseInt(friendCode))
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(
              `Works: Code => ${friendCode} User: ${doc.data().name}`
            );

            this.setState({
              userSearch: !userSearch,
              searchedRivalName: doc.data().name,
              searchedRivalPWR: doc.data().currPowerLV
            });
            console.log(`curr rivals array: ${this.state.rivals}`);
          });
        });
    } else {
      Alert.alert("Error", `Friend Code: ${friendCode} does not exist`);
    }
  };

  addRival = async () => {
    const { friendCode } = this.state;
    dbContent = db.collection("users").doc(firebase.auth().currentUser.uid);

    console.log(`friendcode: ${friendCode} `);
    this.state.rivals.push(Number(friendCode));
    console.log(`after the push ${this.state.rivals}`);

    await dbContent.set({ rivals: this.state.rivals }, { merge: true });

    this.setState({ userSearch: false });
  };

  render() {
    const { userSearch, searchedRivalName } = this.state;
    return (
      <View style={styles.app}>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Button
            title="Go to Home"
            color="#64BDBD"
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
            <Text
              style={{
                textAlign: "center",
                fontSize: 25,
                margin: 5
              }}
            >
              Power Rankings
            </Text>
            <View style={styles.codeCont}>
              <View style={styles.value}>
                <TextInput
                  style={{ alignSelf: "center" }}
                  placeholder="Enter friend code"
                  placeholderTextColor="rgba(36, 33, 43, 0.5)"
                  onChangeText={friendCode => this.setState({ friendCode })}
                  keyboardType={"numeric"}
                />
              </View>
              <View>
                {
                  (this.state.rivals = null ? null : (
                    <Button
                      title="find Rival"
                      color={"#bf6224"}
                      onPress={this.searchFriends}
                    />
                  ))
                }
              </View>
            </View>
            {userSearch ? (
              <ScrollView>
                {console.log(`name: ${searchedRivalName}`)}
                <View style={styles.users}>
                  <View style={styles.searchCont}>
                    <View style={{ alignSelf: "flex-start" }}>
                      <Text style={styles.name}>
                        {searchedRivalName}
                        {"    "}
                      </Text>
                    </View>
                    <View style={{ alignSelf: "flex-end" }}>
                      <Button
                        title="Add Rival"
                        color={"#bf6224"}
                        onPress={this.addRival}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
            ) : null}
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
  codeCont: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5
  },
  titles: {
    textAlign: "center",
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
  value: {
    margin: 5,
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    padding: 2
  },
  scoreBoard: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: "rgba(112, 112, 112, 0.25)"
  },
  users: {
    flex: 1,
    justifyContent: "space-between"
  },
  searchCont: {
    flexDirection: "row",
    padding: 10,
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    borderWidth: 2,
    borderRadius: 15,
    margin: 5,
    justifyContent: "space-between",
    alignItems: "baseline"
  },
  name: {
    fontSize: 25
  }
});
