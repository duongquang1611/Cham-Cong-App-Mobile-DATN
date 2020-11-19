import {types} from '../actions';

const initialState = {
  detailCompany: {},
  allUsers: [],
  allCompanies: [],
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_DETAIL_COMPANY: {
      return Object.assign({}, state, {
        detailCompany: action.data,
      });
    }
    case types.SAVE_LIST_COMPANY: {
      return Object.assign({}, state, {
        allCompanies: action.data,
      });
    }
    case types.SAVE_LIST_USER: {
      return Object.assign({}, state, {
        allUsers: action.data,
      });
    }
    default:
      return state;
  }
}
