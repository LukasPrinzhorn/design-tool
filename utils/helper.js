/* eslint-disable max-len */

export const destructureResponse = (responses) => {
  let currentLineNumber = -1;
  const result = [];
  let currentObject = {
    id: '0',
    textColor: [],
    boxColor: [],
    widths: [],
    texts: [],
  };
  const textColors = responses[0].rows._array;
  const boxColors = responses[1].rows._array;
  const widths = responses[2].rows._array;
  const texts = responses[3].rows._array;
  const lines = responses[4].rows._array;

  lines.forEach((element) => {
    const {
      lineNumber, textColorId, boxColorId, widthsId, textsId,
    } = element;
    if (lineNumber === currentLineNumber) {
      // filter name of textColor out of array of all the textColors based on the correct id
      currentObject.textColor.push(...textColors.filter((color) => color.id === textColorId).map((color) => color.textColor));
      currentObject.boxColor.push(...boxColors.filter((color) => color.id === boxColorId).map((color) => color.boxColor));
      currentObject.widths.push(...widths.filter((color) => color.id === widthsId).map((color) => color.width));
      currentObject.texts.push(...texts.filter((color) => color.id === textsId).map((color) => color.text));
    } else {
      if (currentLineNumber >= 0) result.push(currentObject);
      currentLineNumber = lineNumber;
      currentObject = {
        id: `${lineNumber}`,
        textColor: textColors.filter((color) => color.id === textColorId).map((color) => color.textColor),
        boxColor: boxColors.filter((color) => color.id === boxColorId).map((color) => color.boxColor),
        widths: widths.filter((color) => color.id === widthsId).map((color) => color.width),
        texts: texts.filter((color) => color.id === textsId).map((color) => color.text),
      };
    }
  });
  result.push(currentObject);
  return result;
};

export const convertColorObjectToArray = (obj) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  const arr = keys.map((key, index) => ({
    fieldName: key,
    ...values[index],
  }));
  return arr;
};
