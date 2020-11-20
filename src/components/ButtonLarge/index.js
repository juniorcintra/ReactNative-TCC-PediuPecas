import React from 'react';
import {TouchableOpacity, Text, ActivityIndicator} from 'react-native';

import styles from './style';

export default function ButtonLarge({text, type, action, loading = false}) {
  return (
    <TouchableOpacity
      style={type === 'default' ? styles.button : styles.buttonLight}
      onPress={action}>
      {loading !== true && <Text style={styles.textBtn}>{text}</Text>}
      {loading === true && <ActivityIndicator size="large" color="#000" />}
    </TouchableOpacity>
  );
}
