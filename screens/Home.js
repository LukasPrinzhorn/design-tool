import React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';
import { homeConfig } from '../configs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#D2DEE6',
  },
  button: {
    backgroundColor: '#6E95AD',
    padding: 20,
    alignItems: 'center',
    margin: 10,
    borderRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
});

const keyCreator = (item, index) => (`${item.toString} ${index}`);

const renderItem = (key, item, navigation) => (
  <TouchableOpacity
    key={key}
    onPress={() => navigation.push(item.name)}
    style={styles.button}
  >
    <Text style={styles.buttonText}>
      Go To
      {' '}
      {item.title}
    </Text>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <FlatList
      data={homeConfig}
      renderItem={
        (element, index) => (renderItem(keyCreator(element, index), element.item, navigation))
      }
      keyExtractor={keyCreator}
    />
  </View>
);

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default HomeScreen;
