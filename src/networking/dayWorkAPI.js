import API from '.';
import actions from '../redux/actions';

const getDetailDayWork = async (dispatch, params) => {
  try {
    let res = await API.GET(API.workDay, params);
    if (res.length > 0) dispatch(actions.saveDetailDayWork(res[0]));
    else dispatch(actions.saveDetailDayWork({}));
  } catch (error) {
    console.log('Day Work API error', error);
  }
};
const getListDayWork = async (dispatch, params) => {
  try {
    let res = await API.GET(API.workDay, params);
    if (res.length > 0) dispatch(actions.saveListDayWork(res));
    else dispatch(actions.saveListDayWork([]));
  } catch (error) {
    console.log('Day Work API error', error);
  }
};
const createOrUpdateDayWork = async (dispatch, params) => {
  try {
    let res = await API.PUT(API.workDay, params);
    dispatch(actions.saveDetailDayWork(res));
  } catch (error) {
    console.log('Day Work API error', error);
  }
};

export default {getDetailDayWork, createOrUpdateDayWork, getListDayWork};
