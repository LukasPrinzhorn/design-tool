import * as SQLite from 'expo-sqlite';
import _ from 'lodash';

const dbName = 'firstTest.db';
const db = SQLite.openDatabase(dbName);

class SQLBuilder {
  static async createTableIfNotExists(tableName, primaryKey, attributes, foreignKeys = []) {
    let values = '';
    attributes.forEach((attribute) => {
      const name = attribute.name.split(' ')[0];
      const type = attribute.type.split(' ')[0];
      values += `, ${name} ${type}`;
    });
    let foreignKey = '';
    foreignKeys.forEach((element) => {
      foreignKey = `${foreignKey}, FOREIGN KEY (${element.name}) REFERENCES ${element.tableReference} (${element.attributeReference}) ON UPDATE CASCADE ON DELETE CASCADE`;
    });
    return db.transaction(
      (tx) => {
        tx.executeSql('PRAGMA foreign_keys=on');
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS ${tableName} (${primaryKey.name} ${primaryKey.type} PRIMARY KEY${values}${foreignKey});`,
        );
      },
      (error) => {
        console.log('caught create error', error);
      },
      () => {
        console.log('successful table created');
        console.log(`CREATE TABLE IF NOT EXISTS ${tableName} (${primaryKey.name} ${primaryKey.type} PRIMARY KEY${values}${foreignKey});`);
      },
    );
  }

  static async insertIntoTable(tableName, keys, values) {
    let valuesString = '';
    values.forEach((value) => {
      valuesString += (typeof (value) === 'string' ? `, '${value}'` : `, ${value}`);
    });
    let result;
    return new Promise((resolve, reject) => db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO ${tableName} (${keys.toString()}) VALUES (${valuesString.substring(2, valuesString.length)})`,
          [],
          (_, queryResult) => {
            result = queryResult;
          },
        );
      },
      (error) => {
        console.log('caught insert error', error);
        reject(error);
      },
      () => {
        console.log('successful data inserted');
        console.log(`INSERT INTO ${tableName} (${keys.toString()}) VALUES (${valuesString.substring(2, valuesString.length)})`);
        resolve(result);
      },
    ));
  }

  static async updateTable(tableName, primaryKey, attribute) {
    // let value = attribute.value.split(' ')[0];
    const value = (typeof (attribute.value) === 'string') ? `'${attribute.value}'` : attribute.value;
    // let key = primaryKey.value.split(' ')[0];
    const keyValue = (typeof (primaryKey.value) === 'string') ? `'${primaryKey.value}'` : primaryKey.value;
    console.log('debug::update', `UPDATE ${tableName} SET ${attribute.key} = ${value} WHERE ${primaryKey.key} = ${keyValue}`);
    return db.transaction(
      (tx) => {
        tx.executeSql(
          `UPDATE ${tableName} SET ${attribute.key} = ${value} WHERE ${primaryKey.key} = ${keyValue}`,
        );
      },
      (error) => {
        console.log('caught update error', error);
      },
      () => {
        console.log('successful table updated');
      },
    );
  }

  static async selectFromTable(tableName, select = '*', condition = '', attribute) {
    const query = (_.isEmpty(condition))
      ? `SELECT ${select} FROM ${tableName}`
      : `SELECT ${select} FROM ${tableName} WHERE ${attribute.key} ${condition} ${attribute.value}`;
    let result = null;
    return new Promise((resolve, reject) => db.transaction(
      (tx) => {
        tx.executeSql(
          query,
          [],
          (_, results) => {
            result = results;
          },
        );
      },
      (error) => {
        console.log('caught select error', error);
        reject(error);
      },
      () => {
        console.log('successful read');
        resolve(result);
      },
    ));
  }

  static async deleteByAttribute(tableName, primaryKey) {
    let result;
    return new Promise((resolve, reject) => db.transaction(
      (tx) => {
        tx.executeSql(
          `DELETE FROM ${tableName} WHERE ${primaryKey.key} = ${primaryKey.value}`,
          [],
          (_, results) => {
            result = results;
          },
        );
      },
      (error) => {
        console.log('caught delete error', error);
        reject(error);
      },
      () => {
        const log = (result.rowsAffected > 0) ? `successful delete of ${result.rowsAffected} rows` : 'No rows deleted';
        console.log(log);
        resolve(result);
      },
    ));
  }

  static async dropTable(tableName) {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `DROP TABLE ${tableName}`,
        );
      },
      (error) => {
        console.log('caught drop error', error);
      },
      () => {
        console.log('successful dropped table');
      },
    );
  }
}

export default SQLBuilder;
