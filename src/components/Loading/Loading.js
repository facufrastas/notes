import React from "react";
import { View, ActivityIndicator } from "react-native";

import styles from "../../assets/styles/components/Loading";

function Loading() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator />
    </View>
  );
}

export default Loading;
