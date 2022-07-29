import React from "react";
import { View, Image, ActivityIndicator } from "react-native";
import styles from "../../assets/styles/components/Loading";

function Loading() {
  return (
    <View style={styles.loading}>
      {/* <Image source={require("../../../android/assets/note.png")} style={styles.loading__logo} /> */}
      <ActivityIndicator />
    </View>
  );
}

export default Loading;
