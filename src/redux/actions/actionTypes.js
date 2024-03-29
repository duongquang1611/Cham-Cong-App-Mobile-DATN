const LOGIN = {
  REQUEST: 'LOGIN_REQUEST',
  SUCCESS: 'LOGIN_SUCCESS',
  FAILURE: 'LOGIN_FAILURE',
};
const LOGOUT = {
  REQUEST: 'LOGOUT_REQUEST',
  SUCCESS: 'LOGOUT_SUCCESS',
  FAILURE: 'LOGOUT_FAILURE',
};

const LOADING = {
  LOADING: 'LOADING',
  SHOW: 'LOADING_SHOW',
  HIDE: 'LOADING_HIDE',
};

const SAVE_USER_DATA = 'SAVE_USER_DATA';
const SAVE_DAY_WORK = 'SAVE_DAY_WORK';
const SAVE_LIST_DAY_WORK = 'SAVE_LIST_DAY_WORK';
const SAVE_DETAIL_COMPANY = 'SAVE_DETAIL_COMPANY';
const SAVE_LIST_ASK_COME_LEAVE = 'SAVE_LIST_ASK_COME_LEAVE';
const CHANGE_LIST_ASK_COME_LEAVE = 'CHANGE_LIST_ASK_COME_LEAVE';
const CHANGE_LIST_CONFIRM_COME_LEAVE = 'CHANGE_LIST_CONFIRM_COME_LEAVE';

const CHANGE_LIST_ASK_DAY_OFF = 'CHANGE_LIST_ASK_DAY_OFF';
const CHANGE_LIST_CONFIRM_DAY_OFF = 'CHANGE_LIST_CONFIRM_DAY_OFF';

const SAVE_LIST_COMPANY = 'SAVE_LIST_COMPANY';
const SAVE_LIST_USER = 'SAVE_LIST_USER';

const SAVE_SEARCH_USER = 'SAVE_SEARCH_USER';
const SAVE_SEARCH_COMPANY = 'SAVE_SEARCH_COMPANY';
const SAVE_DATA_REPORT = 'SAVE_DATA_REPORT';
export default {
  LOADING,

  // auth
  LOGIN,
  LOGOUT,

  SAVE_USER_DATA,
  SAVE_DAY_WORK,
  SAVE_LIST_DAY_WORK,
  SAVE_DETAIL_COMPANY,
  SAVE_LIST_ASK_COME_LEAVE,

  // noti list come leave datoff update
  CHANGE_LIST_ASK_COME_LEAVE,
  CHANGE_LIST_CONFIRM_COME_LEAVE,
  CHANGE_LIST_ASK_DAY_OFF,
  CHANGE_LIST_CONFIRM_DAY_OFF,

  SAVE_LIST_COMPANY,
  SAVE_LIST_USER,

  // search in management
  SAVE_SEARCH_USER,
  SAVE_SEARCH_COMPANY,

  // report
  SAVE_DATA_REPORT,
};
