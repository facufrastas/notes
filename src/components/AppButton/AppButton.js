import React from "react";
import { TouchableOpacity, Text } from "react-native";

import styles from "../../assets/styles/components/AppButton";

const AppButton = ({ onPress, title, secondary }) => {
  return (
    <TouchableOpacity style={!secondary ? styles.appButton : styles.appButton__secondary} onPress={onPress}>
      <Text style={styles.appButton__text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
