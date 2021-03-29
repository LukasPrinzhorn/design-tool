import React from 'react';
import { Text, View } from 'react-native';

// eslint-disable-next-line no-unused-vars
function LoadingScreen(_props) {
  return (
    <View>
      <Text>
        {_props.title}
        {' '}
        is Loading...
      </Text>
    </View>
  );
}

export default LoadingScreen;
