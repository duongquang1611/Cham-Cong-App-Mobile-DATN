import {types} from '../actions';

const initialState = {
  detailDayWork: {},
  listDayWork: [],
  listAskComeLeave: [],
  changeListAskComeLeave: false,
  changeListConfirmComeLeave: false,
  changeListAskDayOff: false,
  changeListConfirmDayOff: false,
};

export default function dayWorkReducer(state = initialState, action) {
  switch (action.type) {
    case types.SAVE_DAY_WORK: {
      return Object.assign({}, state, {
        detailDayWork: action.data,
      });
    }
    case types.SAVE_LIST_DAY_WORK: {
      return Object.assign({}, state, {
        listDayWork: action.data,
      });
    }
    case types.SAVE_LIST_ASK_COME_LEAVE: {
      return Object.assign({}, state, {
        listAskComeLeave: action.data,
      });
    }
    case types.CHANGE_LIST_ASK_COME_LEAVE: {
      return Object.assign({}, state, {
        changeListAskComeLeave: action.data,
      });
    }
    case types.CHANGE_LIST_CONFIRM_COME_LEAVE: {
      return Object.assign({}, state, {
        changeListConfirmComeLeave: action.data,
      });
    }
    case types.CHANGE_LIST_ASK_DAY_OFF: {
      return Object.assign({}, state, {
        changeListAskDayOff: action.data,
      });
    }
    case types.CHANGE_LIST_CONFIRM_DAY_OFF: {
      return Object.assign({}, state, {
        changeListConfirmDayOff: action.data,
      });
    }
    default:
      return state;
  }
}
