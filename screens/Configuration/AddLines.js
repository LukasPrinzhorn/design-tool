import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { addLine } from '../../redux/actions/lines';
import PreviewButtons from './PreviewButtons';

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

class AddLines extends React.Component {
  constructor(props) {
    super(props);
    const { numberOfBoxes, numberOfTexts } = this.props;
    this.state = {
      isEditorOpen: false,
      radioBoxBtns: this.initBtns(numberOfBoxes, true),
      radioTextBtns: this.initBtns(numberOfTexts, false),
      checkedBoxes: [0],
      checkedTexts: [0],
      newLine: {
        textColor: [],
        boxColor: [],
        widths: [],
        texts: [],
      },
    };
    this.changeWidth = this.changeWidth.bind(this);
    this.updateWidth = this.updateWidth.bind(this);
    this.initBtns = this.initBtns.bind(this);
    this.saveLine = this.saveLine.bind(this);
    this.changeCheckedButton = this.changeCheckedButton.bind(this);
    this.renderButtons = this.renderButtons.bind(this);
  }

  keyCreator = (item, index) => (`${item}${index}`)

  changeNumberOfItems = (numberOfItemsInLine) => {
    const { newLine } = this.state;
    const elementWidth = `${Math.round(100 / numberOfItemsInLine)}%`;
    const widths = [];
    const checkedBoxes = [];
    const checkedTexts = [];
    const { numberOfBoxes, numberOfTexts } = this.props;
    if (_.isEmpty(newLine.widths)) {
      for (let i = 0; i < numberOfItemsInLine; i += 1) {
        widths.push(elementWidth);
        checkedBoxes.push(0);
        checkedTexts.push(0);
      }
    }
    this.setState((prevState) => ({
      newLine: {
        ...prevState.newLine,
        widths,
      },
      checkedBoxes,
      checkedTexts,
      radioBoxBtns: this.initBtns(numberOfBoxes, true),
      radioTextBtns: this.initBtns(numberOfTexts, false),

    }));
  }

  changeWidth = (newValue, index) => {
    const { newLine: { widths } } = this.state;
    const value = (!_.isEmpty(newValue)) ? newValue : 0;
    widths[index] = `${value}%`;
    this.setState((prevState) => ({
      newLine: {
        ...prevState.newLine,
        widths,
      },
    }));
  }

  updateWidth(number, index) {
    const { newLine: { widths } } = this.state;
    const oldValue = parseInt(widths[index].split('%')[0], 10);
    this.changeWidth(`${oldValue + number}`, index);
  }

  initBtns(number, isBox) {
    const arr = [];
    for (let i = 0; i < number; i += 1) {
      arr[i] = (isBox) ? `Box ${i + 1}` : `Text ${i + 1}`; // TODO description
    }
    return arr;
  }

  saveLine(addLines, newLine) {
    const { checkedBoxes, checkedTexts } = this.state;
    if (newLine.widths.length > 0) {
      this.setState({
        isEditorOpen: false,
        newLine: {
          textColor: [],
          boxColor: [],
          widths: [],
          texts: [],
        },
      });
      const dispatchObject = newLine;
      dispatchObject.boxColor = checkedBoxes.map((key) => (`box${key + 1}Color`)); // description TODO
      dispatchObject.textColor = checkedTexts.map((key) => (`text${key + 1}Color`));
      addLines(dispatchObject);
    }
  }

  changeCheckedButton(itemIndex, newValue, isBox) {
    const { checkedBoxes, checkedTexts } = this.state;
    if (isBox) {
      checkedBoxes[itemIndex] = newValue;
      this.setState({ checkedBoxes });
    } else {
      checkedTexts[itemIndex] = newValue;
      this.setState({ checkedTexts });
    }
  }

  renderButtons(itemIndex, isBoxButton) {
    const {
      radioBoxBtns, radioTextBtns, checkedBoxes, checkedTexts,
    } = this.state;
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
                  onPress={() => { this.changeCheckedButton(itemIndex, btnIndex, isBoxButton); }}
                >
                  <Text style={styles.label}>{btn}</Text>
                </TouchableOpacity>
              )
              : (
                <TouchableOpacity
                  style={[styles.itemButton, styles.buttonUnChecked]}
                  onPress={() => { this.changeCheckedButton(itemIndex, btnIndex, isBoxButton); }}
                >
                  <Text style={styles.label}>{btn}</Text>
                </TouchableOpacity>
              )}
          </View>
        ))}
      </View>
    );
  }

  renderLine() {
    const { newLine } = this.state;
    console.log('state', this.state);
    return (
      <View style={styles.flexBlock}>
        {newLine.widths.map((width, index) => (
          <View key={this.keyCreator(width, index)} style={[styles.item, { width }]}>
            <View style={[styles.flexBlock, styles.widthGroup]}>
              <Text style={styles.label}>Width:</Text>
              <View style={[styles.flexBlock, styles.widthInputWrapper]}>
                <TouchableOpacity
                  onPress={() => { this.updateWidth(-1, index); }}
                  style={{ }}
                >
                  <Text style={styles.widthButton}>-</Text>
                </TouchableOpacity>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={(newValue) => this.changeWidth(newValue, index)}
                  value={width.match(/\d+/)[0]}
                  style={styles.widthInputField}
                />
                <TouchableOpacity
                  onPress={() => { this.updateWidth(1, index); }}
                  style={styles.widthButton}
                >
                  <Text>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <PreviewButtons
              state={this.state}
              changeCheckedButton={this.changeCheckedButton}
              itemIndex={index}
              isBoxButton
            />
            <PreviewButtons
              state={this.state}
              changeCheckedButton={this.changeCheckedButton}
              itemIndex={index}
              isBoxButton={false}
            />
            {/* this.renderButtons(index, true)}
            {this.renderButtons(index, false) */}
          </View>
        ))}
      </View>
    );
  }

  render() {
    const { isEditorOpen, newLine } = this.state;
    const { addLines } = this.props;
    return (
      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => ((!isEditorOpen)
            ? this.setState({ isEditorOpen: true })
            : this.saveLine(addLines, newLine))}
        >
          {!isEditorOpen
            ? <Text style={styles.buttonText}>+ ADD NEW LINE</Text>
            : <Text style={styles.buttonText}>SAVE LINE</Text>}
        </TouchableOpacity>
        {isEditorOpen
          ? (
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.inputField}
                keyboardType="numeric"
                onChangeText={(text) => this.changeNumberOfItems(text)}
                placeholder="# of items in line"
              />
              {this.renderLine()}
            </View>
          )
          : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => state.configReducer;

function mapDispatchToProps(dispatch) {
  return {
    addLines: (newLine) => dispatch(addLine(newLine)),
  };
}

AddLines.propTypes = {
  addLines: PropTypes.func.isRequired,
  numberOfBoxes: PropTypes.any.isRequired,
  numberOfTexts: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddLines);
