import {types} from '.';

const saveReportAllData = (data) => {
  return {
    type: types.SAVE_REPORT_ALL_DATA,
    data: data,
  };
};

const saveListWorkDayCompany = (data) => {
  return {
    type: types.SAVE_REPORT_WORK_DAY_COMPANY,
    data: data,
  };
};
const saveListAskInCompany = (data) => {
  return {
    type: types.SAVE_REPORT_ASK_COMPANY,
    data: data,
  };
};
export default {
  saveReportAllData,
  saveListWorkDayCompany,
  saveListAskInCompany,
};
