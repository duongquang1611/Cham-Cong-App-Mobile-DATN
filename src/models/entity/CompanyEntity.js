import {COMPANY_TABLE} from './Schema';

const CompanyEntity = {
  name: COMPANY_TABLE,
  primaryKey: '_id',
  properties: {
    _id: {type: 'string?', default: 1},
    name: {type: 'string?'},
    phoneNumber: {type: 'string?'},
    email: {type: 'string?'},
    address: {type: 'string?'},
    createdBy: {type: 'string?'},
    updatedBy: {type: 'string?'},
    website: {type: 'string?'},
    representativeName: {type: 'string?'},
    representativeEmail: {type: 'string?'},
    representativePhoneNumber: {type: 'string?'},
    createdAt: {type: 'date?'},
    updatedAt: {type: 'date?'},
  },
};

export default CompanyEntity;
