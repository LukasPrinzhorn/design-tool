import * as Actions from '../actions/fields';

const initialState = {
  numberOfBoxes: 2,
  numberOfTexts: 1,
};

const configFieldsReducer = (state = initialState, action) => {
  let result = {};
  switch (action.type) {
    case Actions.FIELDS_LOAD:
      result = {
        isLoading: true,
        numberOfBoxes: state.numberOfBoxes,
        numberOfTexts: state.numberOfTexts,
      };
      break;
    case Actions.FIELDS_LOAD_ERROR:
      result = {
        isLoading: false,
        numberOfBoxes: state.numberOfBoxes,
        numberOfTexts: state.numberOfTexts,
      };
      break;
    case Actions.FIELDS_LOAD_FINISHED:
      result = {
        isLoading: false,
        numberOfBoxes: action.payload.numberOfBoxes,
        numberOfTexts: action.payload.numberOfTexts,
      };
      break;
    case Actions.BOXES_UPDATE:
      result = {
        isLoading: false,
        numberOfBoxes: action.payload.numberOfBoxes,
        numberOfTexts: state.numberOfTexts,
      };
      break;
    case Actions.TEXTS_UPDATE:
      result = {
        isLoading: false,
        numberOfBoxes: state.numberOfBoxes,
        numberOfTexts: action.payload.numberOfTexts,
      };
      break;
    case Actions.BOTH_UPDATE:
      result = {
        isLoading: false,
        numberOfBoxes: action.payload.numberOfBoxes,
        numberOfTexts: action.payload.numberOfTexts,
      };
      break;
    default:
      result = {
        isLoading: true,
        numberOfBoxes: state.numberOfBoxes,
        numberOfTexts: state.numberOfTexts,
      };
  }
  return result;
};

export default configFieldsReducer;
