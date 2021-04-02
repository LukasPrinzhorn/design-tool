import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as ColorsActions from '../../redux/actions/colors';
import InputAccordion from './InputAccordion';

class ColorInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSections: [],
      config: this.initState(),
    };
    this.onChange = this.onChange.bind(this);
    this.changeText = this.changeText.bind(this);
    this.updateColors = this.updateColors.bind(this);
  }

  onChange(sections) {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  }

  changeText = (key, text) => {
    this.setState((prevState) => ({
      ...prevState,
      config: {
        ...prevState.config,
        [key]: { ...prevState[key], color: text },
      },
    }
    ));
  };

  initState() {
    const { numberOfTexts: texts } = this.props;
    const { numberOfBoxes: boxes } = this.props;
    let config = {};
    for (let i = 1; i <= boxes; i += 1) {
      const elem = `box${i}Color`;
      const value = {
        color: '',
        title: `Box ${i} Color`,
      };
      config = { ...config, [elem]: value };
    }
    for (let i = 1; i <= texts; i += 1) {
      const elem = `text${i}Color`;
      const value = {
        color: '',
        title: `Text ${i} Color`,
      };
      config = { ...config, [elem]: value };
    }
    return config;
  }

  updateColors() {
    const { changeBoxColor } = this.props;
    changeBoxColor(this.state);
  }

  render() {
    const { isLoading } = this.state;
    if (!isLoading) this.state.config = this.initState();
    const { config, activeSections } = this.state;
    const data = Object.keys(config);
    return (
      <View>
        <View>
          <InputAccordion
            activeSections={activeSections}
            data={data}
            changeText={this.changeText}
            onChange={this.onChange}
            updateColors={this.updateColors}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => state.configFieldsReducer;

const mapDispatchToProps = (dispatch) => ({
  changeBoxColor: (state) => dispatch(ColorsActions.updateColors(state)),
});

ColorInput.propTypes = {
  changeBoxColor: PropTypes.func.isRequired,
  numberOfTexts: PropTypes.number.isRequired,
  numberOfBoxes: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorInput);
