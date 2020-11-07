import {types} from '.';

const saveDetailCompany = (data) => {
  return {
    type: types.SAVE_DETAIL_COMPANY,
    data: data,
  };
};
export default {saveDetailCompany};
