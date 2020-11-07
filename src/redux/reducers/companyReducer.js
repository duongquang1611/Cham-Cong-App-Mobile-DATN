import {types} from '../actions';

const initialState = {
  detailCompany: {},
};

export default function companyReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_DETAIL_COMPANY: {
      return Object.assign({}, state, {
        detailCompany: action.data,
      });
    }
    default:
      return state;
  }
}
