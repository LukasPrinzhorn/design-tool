import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addLine } from '../../redux/actions/lines';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6E95AD',
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  flexBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    minWidth: 60,
  },
  widthGroup: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    margin: 5,
  },
  widthInputWrapper: {
    alignItems: 'center',
    padding: 2,
  },
  widthInputField: {
    margin: 5,
    paddingLeft: 5,
    fontSize: 12,
    borderWidth: 0.5,
  },
  widthButton: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonGroup: {
    width: '100%',
    justifyContent: 'space-evenly',
    marginVertical: 1,
  },
  itemButton: {
    backgroundColor: '#6E95AD',
    borderWidth: 1,
    borderColor: '#6E95AD',
    borderRadius: 5,
    margin: 1,
  },
  buttonChecked: {
    backgroundColor: '#6E95AD',
  },
  buttonUnChecked: {
    backgroundColor: '#fff',
  },
  inputWrapper: {
    borderWidth: 4,
    borderTopWidth: 0,
    borderColor: '#6E95AD',
    backgroundColor: '#D2DEE6',
    alignItems: 'center',
    padding: 10,
  },
  inputField: {
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 5,
    margin: 5,
  },
});

class PreviewButtons extends React.Component {
  renderButtons(itemIndex, isBoxButton) {
    const { state, changeCheckedButton } = this.props;
    const {
      radioBoxBtns, radioTextBtns, checkedBoxes, checkedTexts,
    } = state;
    const radioBtns = (isBoxButton) ? radioBoxBtns : radioTextBtns;
    const checked = (isBoxButton) ? checkedBoxes : checkedTexts;

    return (
      <View style={[styles.flexBlock, styles.buttonGroup]}>
        {radioBtns.map((btn, btnIndex) => (
          <View key={btn}>
            {checked[itemIndex] === btnIndex
              ? (
                <TouchableOpacity
                  style={[styles.itemButton, styles.buttonChecked]}
                  onPress={() => { changeCheckedButton(itemIndex, btnIndex, isBoxButton); }}
                >
                  <Text style={styles.label}>{btn}</Text>
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity
                  style={[styles.itemButton, styles.buttonUnChecked]}
                  onPress={() => { changeCheckedButton(itemIndex, btnIndex, isBoxButton); }}
                >
                  <Text style={styles.label}>{btn}</Text>
                </TouchableOpacity>
              )}
          </View>
        ))}
      </View>
    );
  }

  render() {
    const { itemIndex, isBoxButton } = this.props;
    return (
      this.renderButtons(itemIndex, isBoxButton)
    );
  }
}

export default PreviewButtons;
