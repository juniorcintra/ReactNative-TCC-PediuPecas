import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './style';

export default function ButtonDefault({text, type, action}) {
  return (
    <TouchableOpacity
      style={type === 'default' ? styles.button : styles.buttonLight}
      onPress={action}>
      <Text style={styles.textBtn}>{text}</Text>
    </TouchableOpacity>
  );
}
