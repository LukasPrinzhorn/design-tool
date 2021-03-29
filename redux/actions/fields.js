import _ from 'lodash';

export const BOXES_UPDATE = 'boxes:number:update';
export const TEXTS_UPDATE = 'texts:number:update';
export const BOTH_UPDATE = 'boxes:texts:number:update';
export const NO_UPDATE = 'null:update';

export const updateNumberOfInputFields = (pay) => {
  const obj = {
    payload:
    {
      numberOfBoxes: pay.numberOfBoxes,
      numberOfTexts: pay.numberOfTexts,
    },
  };
  if (!_.isEmpty(pay.numberOfBoxes) && !_.isEmpty(pay.numberOfTexts)) {
    obj.type = BOTH_UPDATE;
  } else if (!_.isEmpty(pay.numberOfBoxes)) {
    obj.type = BOXES_UPDATE;
  } else if (!_.isEmpty(pay.numberOfTexts)) {
    obj.type = TEXTS_UPDATE;
  } else {
    obj.type = NO_UPDATE;
  }
  return obj;
};
