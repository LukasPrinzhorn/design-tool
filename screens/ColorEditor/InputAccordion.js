import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet, Dimensions,
} from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A0C0D5',
    paddingVertical: 10,
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30,
    marginBottom: 10,
  },
  flexBlock: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textLabel: {
    textAlignVertical: 'center',
    width: '50%',
    minWidth: 80,
  },
  listItem: {
    backgroundColor: '#6E95AD',
    marginHorizontal: 5,
    marginVertical: 5,
    paddingVertical: 20,
    paddingHorizontal: 5,
    borderRadius: 5,
    width: (Dimensions.get('window').width - 20) / 2,
  },
  inputField: {
    width: '50%',
    borderWidth: 1,
    borderColor: '#fff',
    padding: 5,
    backgroundColor: '#fff',
    flexGrow: 1,
    borderRadius: 10,
  },
  buttonWrapper: {
    justifyContent: 'center',
  },
  active: {
    backgroundColor: '#6E95AD',
  },
  inactive: {
    backgroundColor: '#6E95AD',
  },
  header: {
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
});

class InputAccordion extends React.Component {
    renderItem = ({
      item,
    }) => {
      const { changeText } = this.props;
      return (
        <View style={[styles.listItem, styles.flexBlock]}>
          <Text style={[styles.textLabel]}>
            {item}
            :
          </Text>
          <TextInput
            onChangeText={(text) => changeText(item, text)}
            style={styles.inputField}
            placeholder="Eg. #ffff00"
          />
        </View>
      );
    }

    keyCreator = (index) => index.toString();

    renderHeader = (section, _, isActive) => {
      const title = (isActive) ? 'Close Input Panel' : 'Open Input Panel';
      return (
        <Animatable.View
          duration={400}
          style={[styles.header, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
        >
          <Text style={styles.headerText}>{title}</Text>
        </Animatable.View>
      );
    }

      renderContent = (section) => {
        const { updateColors } = this.props;
        return (
          <View style={styles.container}>
            <FlatList
              data={section.content}
              renderItem={this.renderItem}
              numColumns={2}
              keyExtractor={this.keyCreator}
            />
            <View style={[styles.flexBlock, styles.buttonWrapper]}>
              <TouchableOpacity
                onPress={() => updateColors(this.state)}
              >
                <Ionicons name="md-add" size={40} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        );
      }

      render() {
        const {
          activeSections, data, onChange,
        } = this.props;
        return (
          <Accordion
            activeSections={activeSections}
            sections={[
              {
                title: 'Input',
                content: data,
              },
            ]}
            touchableComponent={TouchableOpacity}
            expandMultiple={false}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={(sections) => onChange(sections)}
          />
        );
      }
}

InputAccordion.propTypes = {
  activeSections: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  changeText: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  updateColors: PropTypes.func.isRequired,
};

export default InputAccordion;
