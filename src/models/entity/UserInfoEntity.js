import {USER_INFO_TABLE} from './Schema';

const UserInfoEntity = {
  name: USER_INFO_TABLE,
  primaryKey: '_id',
  properties: {
    _id: {type: 'string?'},
    username: {type: 'string?'},
    name: {type: 'string?'},
    roleId: {type: 'ROLE?', default: {}},
    companyId: {type: 'COMPANY?'},
    parentId: {type: 'PARENT?'},
    phoneNumber: {type: 'string?'},
    address: {type: 'string?'},
    email: {type: 'string?'},
    gender: {type: 'int?'},
    dateOfBirth: {type: 'date?'},
    avatar: {type: 'AVATAR?', default: null},
    personId: {type: 'string?'},
    createdAt: {type: 'string?'},
    updatedAt: {type: 'string?'},
  },
};

export default UserInfoEntity;
