import React from 'react';
import _ from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import PropTypes from 'prop-types';
import SwipeBox from './SwipeBox';

const styles = StyleSheet.create({
  flexBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 5,
  },
  item: {
    borderWidth: 1,
  },
});

class Line extends React.Component {
  keyCreator = (item, index) => (`${item}${index}`)

  printBox = (key, textNo, boxNo, customStyles) => (
    <View
      key={key}
      style={[styles.item, customStyles]}
    >
      <Text>
        Text
        {' '}
        {textNo}
      </Text>
      <Text>
        Box
        {' '}
        {boxNo}
      </Text>
    </View>
  )

  render = () => {
    const {
      itemKey, element, lineIndex, deleteLine, loadLines,
    } = this.props;
    if (!_.isEmpty(element)) {
      return (
        <Swipeable
          key={itemKey}
          renderLeftActions={(progress, dragX) => (
            <SwipeBox
              progress={progress}
              dragX={dragX}
              lineIndex={element.id}
              deleteLine={deleteLine}
            />
          )}
        >
          <View style={styles.swipeContainer}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Delete Menu',
                  'Delete Line?',
                  [
                    {
                      text: 'Ask me later',
                      onPress: () => loadLines(),
                    },
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                    },
                    {
                      text: 'OK (delete)',
                      onPress: () => deleteLine(element.id),
                    },
                  ],
                  { cancelable: false },
                );
              }}
            >
              <View key={this.keyCreator(element, lineIndex)} style={styles.flexBlock}>
                {element.widths.map((key, index) => (
                  this.printBox(
                    this.keyCreator(key, index),
                    element.textColor[index].match(/\d+/)[0], // TODO: description
                    element.boxColor[index].match(/\d+/)[0],
                    { width: element.widths[index] },
                  )))}
              </View>
            </TouchableOpacity>
          </View>
        </Swipeable>
      );
    }
    return null;
  }
}

Line.propTypes = {
  deleteLine: PropTypes.func,
  loadLines: PropTypes.func,
  itemKey: PropTypes.string,
  element: PropTypes.object,
  lineIndex: PropTypes.number,
};

Line.defaultProps = {
  deleteLine: () => {},
  loadLines: () => {},
  itemKey: '0',
  element: {
    id: 0,
    boxcolor: [],
    textColor: [],
    widths: [],
    texts: [],
  },
  lineIndex: 0,
};

export default Line;
