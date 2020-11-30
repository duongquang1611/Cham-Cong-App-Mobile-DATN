import {types} from '../actions';

const initialState = {
  workDaysCompany: [],
  askInCompany: [],
};

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_REPORT_ALL_DATA: {
      return Object.assign({}, state, {
        workDaysCompany: action.data[0],
        askInCompany: action.data[1],
      });
    }
    case types.SAVE_REPORT_WORK_DAY_COMPANY: {
      return Object.assign({}, state, {
        workDaysCompany: action.data,
      });
    }
    case types.SAVE_REPORT_ASK_COMPANY: {
      return Object.assign({}, state, {
        askInCompany: action.data,
      });
    }
    default:
      return state;
  }
}
