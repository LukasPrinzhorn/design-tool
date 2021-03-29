import _ from 'lodash';
import {
  TABLE_LINES,
  TABLE_TEXT_COLORS,
  TABLE_BOX_COLORS,
  TABLE_WIDTHS,
  TABLE_TEXTS,
} from '../configs/tableConfigs';
import SQLBuilder from './SQLBuilder';

const createTable = (table) => SQLBuilder.createTableIfNotExists(
  table.name,
  table.primaryKey,
  table.attributes,
  table.foreignKeys,
);

export const createLinesTables = async () => {
  const createTextColors = createTable(TABLE_TEXT_COLORS);
  const createBoxColors = createTable(TABLE_BOX_COLORS);
  const createWidths = createTable(TABLE_WIDTHS);
  const createTexts = createTable(TABLE_TEXTS);

  Promise.all([createTextColors, createBoxColors, createWidths, createTexts]).then(
    await SQLBuilder.createTableIfNotExists(
      TABLE_LINES.name,
      TABLE_LINES.primaryKey,
      TABLE_LINES.attributes,
      TABLE_LINES.foreignKeys,
    ),
  );
};

export const insertLine = (textColor, boxColor, width, text) => {
  const insertTextColor = SQLBuilder.insertIntoTable(TABLE_TEXT_COLORS.name, ['textColor'], [textColor]);
  const insertBoxColor = SQLBuilder.insertIntoTable(TABLE_BOX_COLORS.name, ['boxColor'], [boxColor]);
  const insertWidth = SQLBuilder.insertIntoTable(TABLE_WIDTHS.name, ['width'], [width]);
  const insertText = SQLBuilder.insertIntoTable(TABLE_TEXTS.name, ['text'], [text]);
  const getLineNumber = SQLBuilder.selectFromTable(TABLE_LINES.name, 'MAX(lineNumber)');

  Promise.all([insertTextColor, insertBoxColor, insertWidth, insertText, getLineNumber])
    .then((responses) => {
      const textColorId = responses[0].insertId;
      const boxColorId = responses[1].insertId;
      const widthId = responses[2].insertId;
      const textId = responses[3].insertId;
      let lineNumber = Object.values(responses[4].rows._array[0])[0];
      lineNumber = (!_.isNull(lineNumber)) ? lineNumber : 0;
      SQLBuilder.insertIntoTable(
        TABLE_LINES.name,
        TABLE_LINES.attributes.map((element) => element.name),
        [lineNumber + 1, textColorId, boxColorId, widthId, textId],
      );
    });
};
