import { TABLE_COLORS } from '../configs/tableConfigs';
import { initialColorsConfig } from '../configs';
import SQLBuilder from './SQLBuilder';
import { convertColorObjectToArray } from './helper';

export const fillColorDB = async (elements = initialColorsConfig) => {
  const {
    name: tableName, primaryKey, attributes, foreignKeys,
  } = TABLE_COLORS;
  let id = 0;
  await SQLBuilder.createTableIfNotExists(tableName, primaryKey, attributes, foreignKeys);
  elements.forEach((element) => {
    console.log('INSERT color', element);
    SQLBuilder.insertIntoTable(
      tableName,
      [primaryKey.name, ...attributes.map((value) => value.name)],
      [id += 1, `${element.fieldName}`, `${element.color}`],
    );
  });
};

const updateColorDB = async (fieldName, color) => {
  const { name, attributes } = TABLE_COLORS;
  SQLBuilder.updateTable(
    name,
    { key: attributes[0].name, value: fieldName },
    { key: attributes[1].name, value: color },
  );
};

export const updateAllColorsDB = async (elements) => {
  const { name: tableName } = TABLE_COLORS;
  const newEntries = convertColorObjectToArray(elements);
  const elementsToUpdate = newEntries.filter((element) => (element.color !== ''));
  await SQLBuilder.selectFromTable(tableName).then((response) => {
    const oldEntries = response.rows._array;
    elementsToUpdate.forEach((element) => {
      updateColorDB(element.fieldName, element.color);
    });
    const entriesToDelete = oldEntries
      .filter((oldColor) => !newEntries
        .map((newColor) => newColor.fieldName)
        .includes(oldColor.fieldName));
    const entriesToInsert = newEntries
      .filter((newColor) => !oldEntries
        .map((oldColor) => oldColor.fieldName)
        .includes(newColor.fieldName));
    entriesToDelete.forEach((element) => {
      SQLBuilder.deleteByAttribute(tableName, { key: 'fieldName', value: element.fieldName });
    });
    entriesToInsert.forEach((element) => {
      if (element.color !== '') {
        SQLBuilder.insertIntoTable(
          tableName,
          ['fieldName', 'color'],
          [element.fieldName, element.color],
        );
      }
    });
  });
};
