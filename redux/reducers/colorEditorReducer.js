import _ from 'lodash';
import * as Actions from '../actions/colors';
import { initialColorsConfig } from '../../configs';
import { convertColorObjectToArray } from '../../utils/helper';

const convertArrayToObject = (arr) => {
  const obj = {};
  arr.forEach((element) => {
    obj[element.fieldName] = element;
  });
  return obj;
};

const colorEditorReducer = (
  state = initialColorsConfig,
  action,
) => {
  let result;
  let payloadArray;
  let stateObject;
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
      payloadArray = convertColorObjectToArray(payload);
      stateObject = convertArrayToObject(Object.values(state));
      result = payloadArray.map((colorObject, index) => {
        // eslint-disable-next-line no-nested-ternary
        if (_.isUndefined(payloadArray[index]) || payloadArray[index].color === '') {
          // eslint-disable-next-line max-len
          return (!_.isUndefined(stateObject[colorObject.fieldName])) ? stateObject[colorObject.fieldName] : colorObject;
        }
        return (!_.isUndefined(stateObject[colorObject.fieldName]))
          ? { ...stateObject[colorObject.fieldName], color: payloadArray[index].color }
          : colorObject;
      });
      break;
    default:
      result = state;
  }
  return result;
};

export default colorEditorReducer;
