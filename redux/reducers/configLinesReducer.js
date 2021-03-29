import _ from 'lodash';
import * as Actions from '../actions/lines';
import { initialLinesConfig } from '../../configs';

const initialState = initialLinesConfig;

function addToConfig(oldArray, newItem) {
  const lastId = (!_.isEmpty(oldArray)) ? parseInt(oldArray[oldArray.length - 1].id, 10) : 0;
  const itemWithId = {
    id: `${lastId + 1}`,
    ...newItem,
  };
  oldArray.push(itemWithId);
  return oldArray;
}

const configLinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LINES_LOAD:
    case Actions.BOTH_UPDATE:
    case Actions.COLORS_UPDATE:
    case Actions.TEXTS_UPDATE:
    case Actions.NO_UPDATE:
      return state;
    case Actions.LINES_UPDATE:
      return {
        ...state,
        config: addToConfig(state.config, action.payload),
      };
    case Actions.DELETE_LINE:
      return {
        ...state,
        config: state.config.filter((element) => element.id !== action.payload.lineIndex),
      };
    case Actions.LINES_LOAD_FINISHED:
    case Actions.LINES_LOAD_ERROR:
      return {
        config: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default configLinesReducer;
