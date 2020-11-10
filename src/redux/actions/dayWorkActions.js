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
export default {saveDetailDayWork, saveListDayWork};
