import { combineReducers } from 'redux';
import colorEditorReducer from './colorEditorReducer';
import configFieldsReducer from './configFieldsReducer';
import configLinesReducer from './configLinesReducer';

const rootReducer = combineReducers({
  colorEditorReducer,
  configFieldsReducer,
  configLinesReducer,
});

export default rootReducer;
