import {types} from '.';

const saveSearchUser = (data) => {
  return {
    type: types.SAVE_SEARCH_USER,
    data: data,
  };
};
const saveSearchCompany = (data) => {
  return {
    type: types.SAVE_SEARCH_COMPANY,
    data: data,
  };
};

export default {saveSearchUser, saveSearchCompany};
