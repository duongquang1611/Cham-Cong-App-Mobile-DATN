import {LOGIN_TABLE} from './Schema';

const LoginEntity = {
  name: LOGIN_TABLE,
  primaryKey: 'userId',
  properties: {
    userId: {type: 'string?', default: 1},
    token: {type: 'string?'},
    roleId: {type: 'string?'},
    updatedAt: {type: 'date?', default: new Date()},
  },
};

export default LoginEntity;
