import {ROLE_TABLE} from './Schema';

const RoleEntity = {
  name: ROLE_TABLE,
  primaryKey: '_id',
  properties: {
    _id: {type: 'string?', default: 1},
    name: {type: 'string?'},
    code: {type: 'string?'},
    level: {type: 'string?'},
  },
};

export default RoleEntity;
