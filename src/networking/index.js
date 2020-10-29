import axios from 'axios';
import models from '../models';

import urlAPI from './urlAPI';

const isSuccess = (res) => {
  let errorCodeString = JSON.stringify(res.request.status);
  console.log('error code:', errorCodeString);
  if (errorCodeString.charAt(0) === '2') {
    return true;
  }
  return false;
};
const instanceAPI = axios.create({
  baseURL: urlAPI.BASE_API_URL,
  timeout: 5000,
});

instanceAPI.interceptors.response.use(
  async (response) => {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instanceAPI.interceptors.request.use(async (request) => {
  if (request.data instanceof FormData) {
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
const GET = async (url, params, config) => {
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

export {GET, POST, PUT, DELETE, instanceAPI, isSuccess};