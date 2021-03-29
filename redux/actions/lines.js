import SQLBuilder from '../../utils/SQLBuilder';
import { createLinesTables, insertLine } from '../../utils/linesDBUtils';
import { destructureResponse } from '../../utils/helper';
import {
  TABLE_LINES,
  TABLE_TEXT_COLORS,
  TABLE_BOX_COLORS,
  TABLE_WIDTHS,
  TABLE_TEXTS,
} from '../../configs/tableConfigs';

export const NO_UPDATE = 'null:update';
export const LINES_LOAD = 'lines:load';
export const LINES_LOAD_FINISHED = 'lines:load:finished:success';
export const LINES_LOAD_ERROR = 'lines:load:finished:error';
export const LINES_UPDATE = 'lines:update';
export const DELETE_LINE = 'lines:delete';

export const loadLines = () => (dispatch) => {
  createLinesTables();
  console.log('Load Lines');
  dispatch({
    type: LINES_LOAD,
    payload: {},
  });
  const selectTextColors = SQLBuilder.selectFromTable(TABLE_TEXT_COLORS.name);
  const selectBoxColors = SQLBuilder.selectFromTable(TABLE_BOX_COLORS.name);
  const selectWidths = SQLBuilder.selectFromTable(TABLE_WIDTHS.name);
  const selectTexts = SQLBuilder.selectFromTable(TABLE_TEXTS.name);
  const selectLines = SQLBuilder.selectFromTable(TABLE_LINES.name);
  Promise.all([selectTextColors, selectBoxColors, selectWidths, selectTexts, selectLines])
    .then((responses) => {
      console.log('Finish Loading Lines', responses);
      const payload = destructureResponse(responses);
      dispatch({
        type: LINES_LOAD_FINISHED,
        payload,
      });
    })
    .catch((error) => {
      dispatch({
        type: LINES_LOAD_ERROR,
        payload: error,
      });
    });
};

export const addLine = (data) => (dispatch) => {
  const {
    textColor,
    boxColor,
    widths,
    texts,
  } = data;
  let type = null;
  for (let i = 0; i < widths.length; i += 1) {
    data.texts.push('0');
  }

  if (
    boxColor.length === textColor.length
      && boxColor.length === texts.length
      && boxColor.length === widths.length
      && boxColor.length !== 0) {
    type = LINES_UPDATE;
    widths.forEach((width, index) => {
      insertLine(textColor[index], boxColor[index], width, texts[index]);
    });
  } else {
    type = NO_UPDATE;
  }
  dispatch({
    type,
    payload: data,
  });
};

export const deleteLine = (lineIndex) => (dispatch) => {
  SQLBuilder.deleteByAttribute(TABLE_LINES.name, { key: 'lineNumber', value: lineIndex });
  dispatch({
    type: DELETE_LINE,
    payload: {
      lineIndex,
    },
  });
};
