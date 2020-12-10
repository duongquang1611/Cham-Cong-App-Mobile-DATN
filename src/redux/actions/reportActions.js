import {types} from '.';

const saveDataReport = (data) => {
  return {
    type: types.SAVE_DATA_REPORT,
    data: data,
  };
};

export default {
  saveDataReport,
};
