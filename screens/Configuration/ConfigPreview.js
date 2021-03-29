import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../../redux/actions/lines';
import LoadingScreen from '../LoadingScreen';
import Line from './Line';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  seperatorLine: {
    height: 1,
    backgroundColor: 'black',
  },
});

class ConfigPreview extends React.Component {
  constructor(props) {
    super(props);
    const { loadLines } = this.props;
    loadLines();
  }

  keyCreator = (item, index) => (`${item}${index}`)

  render() {
    const { configLinesReducer: lines, deleteLine, loadLines } = this.props;
    return (
      <View style={{ height: '60%' }}>
        <SafeAreaView
          style={{ marginTop: 20 }}
        >
          {lines.isLoading
            ? <LoadingScreen />
            : (
              <View>
                <Line />
                <FlatList
                  data={lines.config}
                  renderItem={({ item, index }) => (
                    <Line
                      itemKey={this.keyCreator(item, index)}
                      element={item}
                      lineIndex={index}
                      deleteLine={deleteLine}
                      leftSwipe={this.leftSwipe}
                      loadLines={loadLines}
                    />
                  )}
                  ItemSeparatorComponent={() => <View style={styles.seperatorLine} />}
                />
              </View>
            )}
        </SafeAreaView>
      </View>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  deleteLine: (lineIndex) => dispatch(Actions.deleteLine(lineIndex)),
  loadLines: () => dispatch(Actions.loadLines()),
});

ConfigPreview.propTypes = {
  configLinesReducer: PropTypes.object.isRequired,
  deleteLine: PropTypes.func.isRequired,
  loadLines: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPreview);
