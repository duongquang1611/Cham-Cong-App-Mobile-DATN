import API from '.';
import actions from '../redux/actions';
import commons from '../ui/commons';
import {getParamsRequest} from '../ui/components/CustomFlatList/getParamsRequest';

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

const getListAskComeLeave = async (
  dispatch,
  params,
  initData = [],
  page = 0,
) => {
  let firstData = [];
  if (Array.isArray(initData)) {
    firstData = [...initData];
  }
  // console.log("initParams", initParams), list ask come leave pass vao
  try {
    let res = await API.GET(
      API.workDay,
      getParamsRequest(
        page,
        commons.NUMBER_ITEM_PAGE_DEFAULT,
        params,
        // SORT,
      ),
    );
    if (Array.isArray(res) && res.length === 0) {
      console.log('invalid');
      return;
    } else {
      dispatch(actions.saveListAskComeLeave([...firstData, ...res]));
    }
    // console.log('res', res);
  } catch (error) {
    console.log('getListAskComeLeaveAPI error', error);
  }
};

const getDataListAskComeLeave = async (dispatch, params, page = 0) => {
  let res = await API.GET(
    API.workDay,
    getParamsRequest(
      page,
      commons.NUMBER_ITEM_PAGE_DEFAULT,
      params,
      // SORT,
    ),
  );
  return res;
};

const getDataListAskComeLeaveProcessed = async (dispatch, params, page = 0) => {
  let res = await API.GET(
    API.askComeLeave,
    getParamsRequest(
      page,
      commons.NUMBER_ITEM_PAGE_DEFAULT,
      params,
      // SORT,
    ),
  );
  return res;
};

const createOrUpdateDayWork = async (dispatch, params) => {
  try {
    let res = await API.PUT(API.workDay, params);
    dispatch(actions.saveDetailDayWork(res));
  } catch (error) {
    console.log('Day Work API error', error);
  }
};

export default {
  getDetailDayWork,
  createOrUpdateDayWork,
  getListDayWork,
  getListAskComeLeave,
  getDataListAskComeLeave,
  getDataListAskComeLeaveProcessed,
};
