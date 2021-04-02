import SQLBuilder from './SQLBuilder';
import { TABLE_FIELDS } from '../configs/tableConfigs';
import { initialFieldsConfig } from '../configs';

export const createFieldsTable = async () => {
  SQLBuilder.createTableIfNotExists(
    TABLE_FIELDS.name,
    TABLE_FIELDS.primaryKey,
    TABLE_FIELDS.attributes,
  );
};

export const insertInitialFields = () => {
  SQLBuilder.insertIntoTable(
    TABLE_FIELDS.name,
    [Object.keys(initialFieldsConfig)],
    [Object.values(initialFieldsConfig)],
  );
};
