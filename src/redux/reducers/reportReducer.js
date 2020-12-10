import {types} from '../actions';

const initialState = {
  dataReport: {
    workDays: {},
    report: {workDay: [], comeLate: [], leaveEarly: []},
    tableHead: [],
    widthArr: [],
  },
};

export default function reportReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_DATA_REPORT: {
      return Object.assign({}, state, {
        dataReport: action.data,
      });
    }

    default:
      return state;
  }
}
