import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  swipeContainer: {
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  deleteBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: '90%',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
    marginTop: '3%',
    marginBottom: '7%',
  },
  deleteBoxText: {
    fontSize: 24,
    color: '#fff',
  },
});

class SwipeBox extends React.Component {
  render() {
    const {
      dragX, lineIndex, deleteLine,
    } = this.props;
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity
        onPress={() => {
          deleteLine(lineIndex);
          this.forceUpdate();
        }}
        activeOpacity={0.6}
      >
        <View style={styles.deleteBox}>
          <Animated.Text style={[styles.deleteBoxText, { transform: [{ scale }] }]}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SwipeBox.propTypes = {
  dragX: PropTypes.object.isRequired,
  lineIndex: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  deleteLine: PropTypes.func.isRequired,
};

export default SwipeBox;
