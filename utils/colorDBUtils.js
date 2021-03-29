import { TABLE_COLORS } from '../configs/tableConfigs';
import { initialColorsConfig } from '../configs';
import SQLBuilder from './SQLBuilder';

export const fillColorDB = async () => {
  const {
    name: tableName, primaryKey, attributes, foreignKeys,
  } = TABLE_COLORS;
  let id = 0;
  await SQLBuilder.createTableIfNotExists(tableName, primaryKey, attributes, foreignKeys);
  initialColorsConfig.forEach((element) => {
    console.log('INSERT color', element);
    SQLBuilder.insertIntoTable(
      tableName,
      [primaryKey.name, ...attributes.map((value) => value.name)],
      [id += 1, `${element.fieldName}`, `${element.color}`],
    );
  });
};

export const updateColorDB = async (fieldName, color) => {
  const { name, attributes } = TABLE_COLORS;
  SQLBuilder.updateTable(
    name,
    { key: attributes[0].name, value: fieldName },
    { key: attributes[1].name, value: color },
  );
};
