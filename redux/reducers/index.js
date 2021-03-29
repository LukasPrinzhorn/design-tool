import { combineReducers } from 'redux';
import colorEditorReducer from './colorEditorReducer';
import configReducer from './configReducer';
import configLinesReducer from './configLinesReducer';

const rootReducer = combineReducers({
  colorEditorReducer,
  configReducer,
  configLinesReducer,
});

export default rootReducer;
