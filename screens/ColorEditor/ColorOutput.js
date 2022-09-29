import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, StyleSheet,
} from 'react-native';
import _ from 'lodash';
import { ScrollView } from 'react-native-gesture-handler';
import { connect, useDispatch, useSelector } from 'react-redux';
import * as ColorActions from '../../redux/actions/colors';
import * as LinesActions from '../../redux/actions/lines';
import LoadingScreen from '../LoadingScreen';

const styles = StyleSheet.create({
  container: {
    height: '92.5%',
    textAlign: 'center',
  },
  wrapper: {
    display: 'flex',
    margin: 2,
  },
  flexBlock: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  textWrapper: {
    justifyContent: 'center',
    borderWidth: 0.5,

  },
  textContainer: {
    textAlign: 'center',
    alignItems: 'stretch',
    fontSize: 14,
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 60,
    textAlign: 'center',
  },
});

const texts = ['The quick brown fox jumps over the lazy dog.', 'Jved fox nymph grabs quick waltz.'];
function ColorOutput() {
  const colorEditorReducer = useSelector((state) => state.colorEditorReducer);
  const linesConfig = useSelector((state) => state.configLinesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ColorActions.loadColors());
    dispatch(LinesActions.loadLines());
  }, []);

  const keyCreator = (item, index) => (`${item}${index}`);

  const printText = (key, textIndex, customStyles, boxColorKey, textColorKey) => {
    const textColors = colorEditorReducer.filter((color) => color.fieldName === textColorKey);
    const boxColors = colorEditorReducer.filter((color) => color.fieldName === boxColorKey);
    const color = (!_.isEmpty(textColors)) ? textColors[0].color : 'black';
    const backgroundColor = (!_.isEmpty(boxColors)) ? boxColors[0].color : 'white';
    const dynamicText = {
      color,
    };
    const dynamicView = {
      backgroundColor,
    };
    return (
      <View key={key} style={[styles.textWrapper, customStyles, dynamicView]}>
        <Text style={[styles.textContainer, dynamicText]}>{texts[textIndex]}</Text>
      </View>
    );
  };

  const renderDynamic = () => (
    <View>
      {linesConfig.config.map(
        (element, index) => (
          <View key={keyCreator(element, index)} style={styles.flexBlock}>
            {element.widths.map((width, widthIndex) => (
              printText(
                keyCreator(width, widthIndex),
                element.texts[widthIndex],
                { width: element.widths[widthIndex] },
                element.boxColor[widthIndex],
                element.textColor[widthIndex],
              )
            ))}
          </View>
        ),
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {linesConfig.isLoading
          ? <LoadingScreen title="Color Output" />
          : (
            <View style={styles.wrapper}>
              {renderDynamic()}
            </View>
          )}
      </ScrollView>
    </View>
  );
}

export default ColorOutput;

/*
class ColorOutput2 extends React.Component {
  constructor(props) {
    super(props);
    const { loadLines, loadData } = this.props;
    loadLines();
    loadData();
  }

  keyCreator = (item, index) => (`${item}${index}`)

  renderDynamic = () => {
    const { configLinesReducer: linesConfig } = this.props;
    return (
      <View>
        {linesConfig.config.map(
          (element, index) => (
            <View key={this.keyCreator(element, index)} style={styles.flexBlock}>
              {element.widths.map((width, widthIndex) => (
                this.printText(
                  this.keyCreator(width, widthIndex),
                  element.texts[widthIndex],
                  { width: element.widths[widthIndex] },
                  element.boxColor[widthIndex],
                  element.textColor[widthIndex],
                )
              ))}
            </View>
          ),
        )}
      </View>
    );
  };

  printText = (key, textIndex, customStyles, boxColorKey, textColorKey) => {
    const { colorEditorReducer } = this.props;
    const textColors = colorEditorReducer.filter((color) => color.fieldName === textColorKey);
    const boxColors = colorEditorReducer.filter((color) => color.fieldName === boxColorKey);
    const color = (!_.isEmpty(textColors)) ? textColors[0].color : 'black';
    const backgroundColor = (!_.isEmpty(boxColors)) ? boxColors[0].color : 'white';
    const dynamicText = {
      color,
    };
    const dynamicView = {
      backgroundColor,
    };
    return (
      <View key={key} style={[styles.textWrapper, customStyles, dynamicView]}>
        <Text style={[styles.textContainer, dynamicText]}>{texts[textIndex]}</Text>
      </View>
    );
  }

  render() {
    const { configLinesReducer: lines } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          {lines.isLoading
            ? <LoadingScreen title="Color Output" />
            : (
              <View style={styles.wrapper}>
                {this.renderDynamic()}
              </View>
            )}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  loadData: () => dispatch(ColorActions.loadColors()),
  loadLines: () => dispatch(LinesActions.loadLines()),
});

ColorOutput.propTypes = {
  configLinesReducer: PropTypes.object.isRequired,
  colorEditorReducer: PropTypes.array.isRequired,
  loadData: PropTypes.func.isRequired,
  loadLines: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorOutput);
*/
