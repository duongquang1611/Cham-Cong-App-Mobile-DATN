import {types} from '../../redux/actions';

const isShowLoading = (isShow) => {
  return {
    type: types.LOADING.LOADING,
    isShow: isShow,
  };
};

const showLoading = () => {
  return {
    type: types.LOADING.SHOW,
  };
};

const hideLoading = () => {
  return {
    type: types.LOADING.HIDE,
  };
};
export default {isShowLoading, showLoading, hideLoading};
