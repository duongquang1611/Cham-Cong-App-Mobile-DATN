import {showAlert} from 'cc-components';
import API from '.';
import actions from '../redux/actions';

const getDetailCompany = async (companyId, dispatch, params) => {
  try {
    let res = await API.GET(API.detailCompany(companyId), params);
    if (res && res._id) {
      dispatch(actions.saveDetailCompany(res));
    }
  } catch (error) {
    console.log('getDetailCompany', error);
  }
};
const postConfigCompany = async (dispatch, params) => {
  try {
    let res = await API.PUT(API.configCompany, params);
    if (res && res._id) {
      dispatch(actions.saveDetailCompany(res));
      showAlert({msg: 'Cập nhật thông tin thành công.'});
    }
  } catch (error) {
    console.log('postConfigCompany', error);
  }
};
const getListCompanies = async (dispatch, params) => {
  try {
    let res = await API.GET(API.searchCompanies, params);
    dispatch(actions.saveListCompanies(res));
  } catch (error) {
    console.log('getListCompanies', error);
  }
};
const getListUsers = async (dispatch, params) => {
  try {
    let res = await API.GET(API.searchUsers, params);
    dispatch(actions.saveListUsers(res));
  } catch (error) {
    console.log('getListUsers', error);
  }
};

const getListDayWorkCompany = async (dispatch, params) => {
  try {
    let res = await API.GET(API.workDayCompany, params);
    // console.log(API.workDayCompany, res);
    if (res && Array.isArray(res))
      dispatch(actions.saveListWorkDayCompany(res));
  } catch (error) {
    console.log('Day Work API error', error);
  }
};
const getListAskComeLeaveInCompany = async (dispatch, params) => {
  try {
    let res = await API.GET(API.askComeLeaveInCompany, params);
    // console.log(API.askComeLeaveInCompany, res);
    if (res && Array.isArray(res))
      dispatch(actions.saveListAskComeLeaveInCompany(res));
  } catch (error) {
    console.log('Day Work API error', error);
  }
};
const getListAskDayOffInCompany = async (dispatch, params) => {
  try {
    let res = await API.GET(API.askDayOffInCompany, params);
    // console.log(API.askDayOffInCompany, res);
    if (res && Array.isArray(res))
      dispatch(actions.saveListAskDayOffInCompany(res));
  } catch (error) {
    console.log('Day Work API error', error);
  }
};
const getListUsersInCompany = async (dispatch, params) => {
  try {
    let res = await API.GET(API.usersInCompany, params);
    // console.log(API.askDayOffInCompany, res);

    if (res && Array.isArray(res))
      dispatch(actions.saveListUsersInCompany(res));
  } catch (error) {
    console.log('getListUsers', error);
  }
};

export default {
  getDetailCompany,
  getListCompanies,
  getListUsers,
  postConfigCompany,
  getListDayWorkCompany,
  getListAskComeLeaveInCompany,
  getListAskDayOffInCompany,
  getListUsersInCompany,
};
