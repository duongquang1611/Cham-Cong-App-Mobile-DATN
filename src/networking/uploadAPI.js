import RNFetchBlob from 'rn-fetch-blob';
import API from '.';
import models from '../models';
import actions from '../redux/actions';

const uploadImage = async (dispatch, params) => {
  try {
    let res = await API.POST(API.upload, params);
    return res;
  } catch (error) {
    console.log('Company API error', error);
  }
};

async function uploadImageRNFetchBlob(dataImages) {
  let response = '';
  try {
    response = await RNFetchBlob.fetch(
      'POST',
      API.BASE_API_URL + API.upload,
      {
        Authorization: `Bearer ${models.getTokenSignIn()}`,
        'Content-Type': 'multipart/form-data',
      },
      dataImages,
    );
  } catch (error) {
    console.log(error);
  }
  return response.data;
}

export default {uploadImage, uploadImageRNFetchBlob};
