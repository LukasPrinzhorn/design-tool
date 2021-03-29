import React from 'react';
import {
  View, StyleSheet,
} from 'react-native';
import ConfigFields from './ConfigFields';
import AddLines from './AddLines';
import ConfigPreview from './ConfigPreview';

const styles = StyleSheet.create({
  container: {
  },
});

const Configuration = () => (
  <View style={styles.container}>
    <ConfigFields />
    <AddLines />
    <ConfigPreview />
  </View>
);

export default Configuration;
