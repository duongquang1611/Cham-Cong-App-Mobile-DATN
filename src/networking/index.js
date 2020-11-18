import axios from 'axios';
import models from '../models';
import {showAlert} from '../ui/components';

import urlAPI from './urlAPI';
import dayWorkAPI from './dayWorkAPI';
import companyAPI from './companyAPI';
import uploadAPI from './uploadAPI';
import AsyncStorage from '@react-native-community/async-storage';

const isSuccess = (res) => {
  let errorCodeString = JSON.stringify(res.request.status);
  console.log('error code:', errorCodeString);
  if (errorCodeString.charAt(0) === '2') {
    return true;
  }
  return false;
};
const instanceAPI = axios.create({
  // baseURL: urlAPI.BASE_API_URL,
  timeout: 5000,
});

instanceAPI.interceptors.response.use(
  async (response) => {
    return response.data;
  },
  function (error) {
    let messageError = 'Lỗi không xác định.';
    console.log('Error code:', error.response.status);
    if (error.response.status === 401) {
      models.handleSignOut();
      messageError =
        'Phiên đăng nhập đã hết hạn. Vui lòng khởi động lại ứng dụng và đăng nhập lại';
    } else if (error.response.data.msg) {
      messageError = error.response.data.msg;
    }
    return showAlert({msg: messageError});
    // return Promise.reject(error);
  },
);

instanceAPI.interceptors.request.use(async (request) => {
  try {
    let baseApiUrl = await AsyncStorage.getItem(API.keyAsyncStorageBaseUrl);

    if (!baseApiUrl) {
      baseApiUrl = urlAPI.BASE_API_URL;
    } else {
      let baseApiUrlObj = JSON.parse(baseApiUrl);
      if (baseApiUrlObj.id === 1 && baseApiUrlObj !== urlAPI.BASE_API_URL) {
        baseApiUrl = urlAPI.BASE_API_URL;
      } else {
        baseApiUrl = baseApiUrlObj.server;
      }
    }

    request.baseURL = baseApiUrl;
  } catch (error) {
    console.log('error', error);
  }

  if (request.data instanceof FormData) {
    console.log('request.data', request.data);
    request.headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  if (models.getTokenSignIn()) {
    request.headers = {
      Authorization: `Bearer ${models.getTokenSignIn()}`,
    };
  }
  return request;
});

const POST = async (url, body, option) => {
  try {
    const result = await instanceAPI.post(
      url,
      body,
      option || {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return result;
  } catch (error) {
    return error;
  }
};
const GET = async (url, params = {}, config) => {
  try {
    const result = await instanceAPI.get(url, {params: params}, config);
    return result;
  } catch (error) {
    return error;
  }
};
const PUT = async (url, body, config) => {
  try {
    const result = await instanceAPI.put(url, body, config);
    return result;
  } catch (error) {
    return error;
  }
};

const DELETE = async (url, body) => {
  try {
    const result = await instanceAPI.delete(url, body);
    return result;
  } catch (e) {
    return e;
  }
};

const API = {
  GET,
  POST,
  PUT,
  DELETE,
  instanceAPI,
  isSuccess,
  ...urlAPI,
  ...dayWorkAPI,
  ...companyAPI,
  ...uploadAPI,
};
export default API;
