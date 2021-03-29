import * as Actions from '../actions/colors';
import { initialColorsConfig } from '../../configs';

const colorEditorReducer = (
  state = initialColorsConfig,
  action,
) => {
  let result;
  let currentState;
  let { type } = action;
  const { payload } = action;
  type = (type.startsWith('@@redux')) ? Actions.COLORS_INIT : type;
  switch (type) {
    case Actions.COLORS_INIT:
      result = state;
      break;
    case Actions.COLORS_LOAD:
      result = state;
      break;
    case Actions.COLORS_LOAD_FINISHED:
      result = payload;
      break;
    case Actions.COLORS_LOAD_ERROR:
      result = state;
      break;
    case Actions.COLORS_UPDATE:
      currentState = state;
      result = [...currentState];
      currentState.forEach((color, index) => {
        result[index] = (payload[color.fieldName].color === '') ? currentState[index] : { ...currentState[index], color: payload[color.fieldName].color };
      });
      console.log('result after update', result);
      break;
    default:
      result = state;
  }
  return result;
};

export default colorEditorReducer;
