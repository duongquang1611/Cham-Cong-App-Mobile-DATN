import {types} from '../../redux/actions';

const saveDetailDayWork = (data) => {
  return {
    type: types.SAVE_DAY_WORK,
    data: data,
  };
};
export default {saveDetailDayWork};
