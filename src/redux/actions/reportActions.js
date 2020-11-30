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
const saveListAskComeLeaveInCompany = (data) => {
  return {
    type: types.SAVE_REPORT_ASK_COME_LEAVE_COMPANY,
    data: data,
  };
};
const saveListAskDayOffInCompany = (data) => {
  return {
    type: types.SAVE_REPORT_ASK_DAY_OFF_COMPANY,
    data: data,
  };
};
const saveListUsersInCompany = (data) => {
  return {
    type: types.SAVE_LIST_USER_COMPANY,
    data: data,
  };
};
export default {
  saveReportAllData,
  saveListWorkDayCompany,
  saveListAskComeLeaveInCompany,
  saveListAskDayOffInCompany,
  saveListUsersInCompany,
};
