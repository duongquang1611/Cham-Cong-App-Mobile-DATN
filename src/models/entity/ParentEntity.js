import {PARENT_TABLE} from './Schema';

const ParentEntity = {
  name: PARENT_TABLE,
  primaryKey: '_id',
  properties: {
    _id: {type: 'string?'},
    username: {type: 'string?'},
    name: {type: 'string?'},
    roleId: {type: 'string?'},
    companyId: {type: 'string?'},
    parentId: {type: 'string?'},
    phoneNumber: {type: 'string?'},
    address: {type: 'string?'},
    email: {type: 'string?'},
    gender: {type: 'int?'},
    dateOfBirth: {type: 'date?'},
    avatar: {type: 'AVATAR?', default: null},
    createdAt: {type: 'string?'},
    updatedAt: {type: 'string?'},
  },
};

export default ParentEntity;
