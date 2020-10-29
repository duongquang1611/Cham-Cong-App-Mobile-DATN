import {types} from '../actions';

const initialState = {
  isShowLoading: false,
};

export default function commonsReducer(state = initialState, action) {
  console.log('commonsReducer -> action.type', action.type);
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
    default:
      return state;
  }
}
