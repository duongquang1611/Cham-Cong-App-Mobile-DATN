import {types} from '../../redux/actions';

const saveDetailDayWork = (data) => {
  return {
    type: types.SAVE_DAY_WORK,
    data: data,
  };
};
const saveListDayWork = (data) => {
  return {
    type: types.SAVE_LIST_DAY_WORK,
    data: data,
  };
};
const saveListAskComeLeave = (data) => {
  return {
    type: types.SAVE_LIST_ASK_COME_LEAVE,
    data: data,
  };
};
const changeListAskComeLeave = (data) => {
  return {
    type: types.CHANGE_LIST_ASK_COME_LEAVE,
    data: data,
  };
};
const changeListConfirmComeLeave = (data) => {
  return {
    type: types.CHANGE_LIST_CONFIRM_COME_LEAVE,
    data: data,
  };
};
export default {
  saveDetailDayWork,
  saveListDayWork,
  saveListAskComeLeave,
  changeListAskComeLeave,
  changeListConfirmComeLeave,
};
