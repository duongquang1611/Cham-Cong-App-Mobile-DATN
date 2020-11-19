import {types} from '.';

const responseLoginSuccess = (data) => {
  return {
    type: types.LOGIN.SUCCESS,
    data: data,
  };
};
const requestLogout = (data) => {
  return {
    type: types.LOGOUT.SUCCESS,
    data: data,
  };
};
const saveUserData = (data) => {
  return {
    type: types.SAVE_USER_DATA,
    data: data,
  };
};

export default {responseLoginSuccess, requestLogout, saveUserData};
