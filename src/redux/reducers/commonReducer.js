import {types} from '../actions';

const initialState = {
  isLoading: false,
};

export default function commonReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOADING.LOADING: {
      return Object.assign({}, state, {
        isLoading: action.isShow,
      });
    }

    case types.LOADING.SHOW: {
      return Object.assign({}, state, {
        isLoading: true,
      });
    }

    case types.LOADING.HIDE: {
      return Object.assign({}, state, {
        isLoading: false,
      });
    }
    default:
      return state;
  }
}
