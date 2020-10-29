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

export default {responseLoginSuccess, requestLogout};
