import Realm from 'realm';
import commons from '../../commons';
import {schemaArray} from '../entity';

var instanceDB = new Realm({
  path: 'ChamCongAppMobile.realm',
  schema: schemaArray,
  schemaVersion: 0,
  migration: function (oldRealm, newRealm) {
    newRealm.deleteAll();
  },
});

export default class DbHelper {
  constructor(schema) {
    this.schema = schema;
  }

  insertOrUpdate(data, isUpdate = false) {
    if (data instanceof Array) {
      instanceDB.write(() => {
        for (let i = 0; i < data.length; i++) {
          instanceDB.create(this.schema.name, data[i], isUpdate);
        }
      });
    } else {
      instanceDB.write(() => {
        return instanceDB.create(this.schema.name, data, isUpdate);
      });
    }
  }

  getAll() {
    let result = null;
    instanceDB.write(() => {
      result = instanceDB.objects(this.schema.name);
    }); //

    return result;
  }

  deleteRow(object) {
    instanceDB.write(() => {
      instanceDB.delete(object);
    });
  }

  getSize() {
    let result = this.getAll();
    return result ? result.length : 0;
  }

  maxPrimaryKey() {
    let maxPrimaryKey = instanceDB
      .objects(this.schema.name)
      .max(this.schema.primaryKey);
    if (maxPrimaryKey) {
      return maxPrimaryKey + 1;
    }
    return 1;
  }

  getObjectByPrimaryKey(valueKey) {
    let result = null;
    try {
      instanceDB.write(() => {
        result = commons.convertToArray(
          instanceDB
            .objects(this.schema.name)
            .filtered(this.schema.primaryKey + ' =  $0', valueKey),
        );
      });
      if (result && result[0]) {
        return result[0];
      }
      return [];
    } catch (error) {
      return result;
    }
  }

  deleteAll() {
    instanceDB.write(() => {
      instanceDB.delete(this.getAll());
    });
  }

  getDataByColumn(key, value) {
    try {
      return instanceDB
        .objects(this.schema.name)
        .filtered(key + ' LIKE "*' + value + '*' + '"');
    } catch (error) {
      return [];
    }
  }

  getData(key, values) {
    return instanceDB.objects(this.schema.name).filtered(key + ' = $0', values);
  }

  selectData(queryStr) {
    return instanceDB.objects(this.schema.name).filtered(queryStr);
  }

  setProp(prop, value) {
    instanceDB.write(() => {
      this[prop] = value;
    });
  }

  closed() {
    if (instanceDB !== null && !instanceDB.isClosed) {
      instanceDB.close();
    }
  }
}
