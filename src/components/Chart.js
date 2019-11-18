import React from "react";
import { Dimensions, View } from "react-native";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";

//firebase
import firebase from "../../firebase";
import "@firebase/firestore";
import "firebase/auth";
const db = firebase.firestore();

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  // queries users database for prevPowerLV and puts it into graph
  componentDidMount() {
    db.collection("users")
      .where("email", "==", firebase.auth().currentUser.email)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState({ data: doc.data().prevPowerLV });
        });
      });
  }

  // create listener that updates the chart based on new data in prevPowerLV (other than
  //  componentDidUpdate)
  render() {
    const data = this.state.data;
    const axesSvg = { fontSize: 12, fill: "white" };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 30;

    return (
      <View style={{ height: 200, padding: 20, flexDirection: "row" }}>
        <YAxis
          data={data}
          style={{ marginBottom: xAxisHeight }}
          contentInset={verticalContentInset}
          svg={axesSvg}
        />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <LineChart
            style={{ flex: 1 }}
            data={data}
            contentInset={verticalContentInset}
            svg={{ stroke: "white" }}
          >
            <Grid />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, height: xAxisHeight }}
            data={data}
            formatLabel={(value, index) => index}
            contentInset={{ left: 10, right: 10 }}
            svg={axesSvg}
          />
        </View>
      </View>
    );
  }
}

export default Chart;
