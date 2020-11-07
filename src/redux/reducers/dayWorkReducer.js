import {types} from '../actions';

const initialState = {
  detailDayWork: {},
};

export default function dayWorkReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_DAY_WORK: {
      return Object.assign({}, state, {
        detailDayWork: action.data,
      });
    }
    default:
      return state;
  }
}
