import React from 'react';
import { View, StyleSheet } from 'react-native';
import ColorInput from './ColorInput';
import ColorOutput from './ColorOutput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0E8EE',
  },
});

export const ColorEditor = () => (
  <View style={styles.container}>
    <ColorInput />
    <ColorOutput />
  </View>
);
