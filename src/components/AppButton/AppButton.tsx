import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

import styles from '../../styles/components/AppButton';

import { Props } from './';

const AppButton = ({ onPress, title, secondary }: Props) => {
  return (
    <TouchableOpacity style={!secondary ? styles.appButton : styles.appButton__secondary} onPress={onPress}>
      <Text style={styles.appButton__text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;
