import {types} from '../actions';

const initialState = {
  usersInCompany: [],
  workDaysCompany: [],
  askComeLeaveInCompany: [],
  askDayOffInCompany: [],
};

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_REPORT_ALL_DATA: {
      return Object.assign({}, state, {
        usersInCompany: action.data[0],
        workDaysCompany: action.data[1],
        askComeLeaveInCompany: action.data[2],
        askDayOffInCompany: action.data[3],
      });
    }
    case types.SAVE_REPORT_WORK_DAY_COMPANY: {
      return Object.assign({}, state, {
        workDaysCompany: action.data,
      });
    }
    case types.SAVE_REPORT_ASK_COME_LEAVE_COMPANY: {
      return Object.assign({}, state, {
        askComeLeaveInCompany: action.data,
      });
    }
    case types.SAVE_REPORT_ASK_DAY_OFF_COMPANY: {
      return Object.assign({}, state, {
        askDayOffInCompany: action.data,
      });
    }
    case types.SAVE_LIST_USER_COMPANY: {
      return Object.assign({}, state, {
        usersInCompany: action.data,
      });
    }
    default:
      return state;
  }
}
