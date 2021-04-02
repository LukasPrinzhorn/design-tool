import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import * as FieldsActions from '../../redux/actions/fields';
import ColorInput from './ColorInput';
import ColorOutput from './ColorOutput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0E8EE',
  },
});

class ColorEditor extends React.Component {
  constructor(props) {
    super(props);
    const { loadFields } = this.props;
    loadFields();
  }

  render() {
    return (
      <View style={styles.container}>
        <ColorInput />
        <ColorOutput />
      </View>
    );
  }
}

const mapStateToProps = (state) => state.configFieldsReducer;

const mapDispatchToProps = (dispatch) => ({
  loadFields: () => dispatch(FieldsActions.loadFields()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ColorEditor);
