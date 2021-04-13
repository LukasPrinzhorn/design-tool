import _ from 'lodash';
import * as Actions from '../actions/colors';
import { initialColorsConfig } from '../../configs';

const convertObjectToArray = (obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const arr = keys.map((value, index) => ({
    fieldName: keys[index],
    ...values[index],
  }));
  return arr;
};

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
      payloadArray = convertObjectToArray(payload);
      stateObject = convertArrayToObject(Object.values(state));
      result = payloadArray.map((colorObject, index) => ((_.isUndefined(payloadArray[index]) || payloadArray[index].color === '')
        ? stateObject[colorObject.fieldName]
        : { ...stateObject[colorObject.fieldName], color: payloadArray[index].color }));
      break;
    default:
      result = state;
  }
  console.log('debug::cER:result', result);
  return result;
};

export default colorEditorReducer;
