import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import styles from '../../styles/components/Loading';

function Loading(): JSX.Element {
  return (
    <View style={styles.loading}>
      <ActivityIndicator />
    </View>
  );
}

export default Loading;
