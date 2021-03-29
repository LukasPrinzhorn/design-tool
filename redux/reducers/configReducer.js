import * as Actions from '../actions/fields';

const initialState = {
  numberOfBoxes: 2,
  numberOfTexts: 2,
};

const configurationReducer = (state = initialState, action) => {
  let result = {};
  switch (action.type) {
    case Actions.BOXES_UPDATE:
      result = {
        numberOfBoxes: action.payload.numberOfBoxes,
        numberOfTexts: state.numberOfTexts,
      };
      break;
    case Actions.TEXTS_UPDATE:
      result = {
        numberOfBoxes: state.numberOfBoxes,
        numberOfTexts: action.payload.numberOfTexts,
      };
      break;
    case Actions.BOTH_UPDATE:
      result = {
        numberOfBoxes: action.payload.numberOfBoxes,
        numberOfTexts: action.payload.numberOfTexts,
      };
      break;
    default:
      result = {
        numberOfBoxes: state.numberOfBoxes,
        numberOfTexts: state.numberOfTexts,
      };
  }
  return result;
};

export default configurationReducer;
