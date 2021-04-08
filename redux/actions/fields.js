import _ from 'lodash';
import { createFieldsTable, insertInitialFields } from '../../utils/fieldsDBUtils';
import SQLBuilder from '../../utils/SQLBuilder';
import { TABLE_FIELDS } from '../../configs/tableConfigs';

export const FIELDS_LOAD = 'fields:load';
export const FIELDS_LOAD_FINISHED = 'fields:load:finished:success';
export const BOXES_UPDATE = 'boxes:number:update';
export const TEXTS_UPDATE = 'texts:number:update';
export const BOTH_UPDATE = 'boxes:texts:number:update';
export const NO_UPDATE = 'null:update';

export const loadFields = () => (dispatch) => {
  createFieldsTable();
  dispatch({
    type: FIELDS_LOAD,
    payload: {},
  });
  SQLBuilder.selectFromTable(TABLE_FIELDS.name)
    .then((response) => {
      if (response.rows._array.length === 0) insertInitialFields();
      dispatch({
        type: FIELDS_LOAD_FINISHED,
        payload: response.rows._array[0],
      });
    })
    .catch(() => {
      console.log('Error loading fields');
    });
};

export const updateNumberOfInputFields = (payload) => {
  const { numberOfBoxes, numberOfTexts } = payload;
  if (!_.isEmpty(numberOfBoxes)) {
    SQLBuilder.updateTable(
      TABLE_FIELDS.name,
      { key: 'id', value: 0 },
      { key: 'numberOfBoxes', value: numberOfBoxes },
    );
  }
  if (!_.isEmpty(numberOfTexts)) {
    SQLBuilder.updateTable(
      TABLE_FIELDS.name,
      { key: 'id', value: 0 },
      { key: 'numberOfTexts', value: numberOfTexts },
    );
  }
  const obj = {
    payload:
    {
      numberOfBoxes: payload.numberOfBoxes,
      numberOfTexts: payload.numberOfTexts,
    },
  };
  if (!_.isEmpty(payload.numberOfBoxes) && !_.isEmpty(payload.numberOfTexts)) {
    obj.type = BOTH_UPDATE;
  } else if (!_.isEmpty(payload.numberOfBoxes)) {
    obj.type = BOXES_UPDATE;
  } else if (!_.isEmpty(payload.numberOfTexts)) {
    obj.type = TEXTS_UPDATE;
  } else {
    obj.type = NO_UPDATE;
  }
  return obj;
};
