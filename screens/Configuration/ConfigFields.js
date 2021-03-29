import React from 'react';
import PropTypes from 'prop-types';
import {
  View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { updateNumberOfInputFields } from '../../redux/actions/fields';

const styles = StyleSheet.create({
  flexBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonWrapper: {
    justifyContent: 'center',
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#6E95AD',
    backgroundColor: '#D2DEE6',
    padding: 5,
    margin: 10,
  },
});

class ConfigFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberOfBoxes: '',
      numberOfTexts: '',
    };
  }

  changeText = (text, isBoxes) => {
    if (isBoxes) {
      this.setState((prevState) => ({
        ...prevState,
        numberOfBoxes: text,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        numberOfTexts: text,
      }));
    }
  }

  render() {
    const { saveConfiguration } = this.props;
    return (
      <View>
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => this.changeText(text, true)}
          placeholder="# of boxes"
          style={styles.inputField}
        />
        <TextInput
          keyboardType="numeric"
          onChangeText={(text) => this.changeText(text, false)}
          placeholder="# of texts"
          style={styles.inputField}
        />
        <View style={[styles.flexBlock, styles.buttonWrapper]}>
          <TouchableOpacity
            onPress={() => saveConfiguration(this.state)}
          >
            <Ionicons name="md-add" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveConfiguration: (state) => dispatch(updateNumberOfInputFields(state)),
  };
}

ConfigFields.propTypes = {
  saveConfiguration: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ConfigFields);
