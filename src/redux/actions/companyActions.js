import {types} from '.';

const saveDetailCompany = (data) => {
  return {
    type: types.SAVE_DETAIL_COMPANY,
    data: data,
  };
};

const saveListCompanies = (data) => {
  return {
    type: types.SAVE_LIST_COMPANY,
    data: data,
  };
};
const saveListUsers = (data) => {
  return {
    type: types.SAVE_LIST_USER,
    data: data,
  };
};
export default {saveDetailCompany, saveListCompanies, saveListUsers};
