import {types} from '../actions';

const initialState = {
  textSearchUser: '',
  textSearchCompany: '',
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_SEARCH_USER: {
      return Object.assign({}, state, {
        textSearchUser: action.data,
      });
    }
    case types.SAVE_SEARCH_COMPANY: {
      return Object.assign({}, state, {
        textSearchCompany: action.data,
      });
    }
    default:
      return state;
  }
}
