import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image
    source={require("../assets/ReactXFirebase.png")}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    width: 230,
    height: 204,
    marginBottom: 12
  }
});

export default memo(Logo);
