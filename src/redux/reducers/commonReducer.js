import {types} from '../actions';

const initialState = {
  isLoginSuccess: null,
  isShowLoading: false,
};

export default function commonsReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING.LOADING: {
      return Object.assign({}, state, {
        isShowLoading: action.isShow,
      });
    }

    case types.LOADING.SHOW: {
      return Object.assign({}, state, {
        isShowLoading: true,
      });
    }

    case types.LOADING.HIDE: {
      return Object.assign({}, state, {
        isShowLoading: false,
      });
    }

    case types.LOGIN.SUCCESS: {
      models.handleLogin(action.data);
      return Object.assign({}, state, {
        isLoginSuccess: true,
      });
    }

    default:
      return state;
  }
}
