import React from "react";
import { Dimensions, View } from "react-native";
import { Grid, LineChart, XAxis, YAxis } from "react-native-svg-charts";

class Chart extends React.PureComponent {
  render() {
    const data = [
      50,
      10,
      40,
      95,
      -4,
      -24,
      85,
      91,
      35,
      53,
      -53,
      24,
      50,
      -20,
      -80
    ];

    const axesSvg = { fontSize: 10, fill: "white" };
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
