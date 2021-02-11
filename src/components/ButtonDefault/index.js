import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

import styles from './style';

export default function ButtonDefault({text, type, action}) {
  return (
    <TouchableOpacity
      style={
        type === 'default'
          ? styles.button
          : type === 'light'
          ? styles.buttonLight
          : ''
      }
      onPress={action}>
      <Text style={type !== 'none' ? styles.textBtn : styles.none}>{text}</Text>
    </TouchableOpacity>
  );
}
