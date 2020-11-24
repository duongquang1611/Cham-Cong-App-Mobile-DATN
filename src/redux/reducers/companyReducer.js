import {types} from '../actions';

const initialState = {
  detailCompany: {
    config: {
      lat: '20.9832312',
      long: '105.8328826',
      ipAddress: '10.10.10.102',
      startBreak: '12:00:00',
      endBreak: '13:30:00',
      checkin: '08:00:00',
      checkout: '17:30:00',
      allowCheckin: '06:30:00',
      allowCheckout: '22:00:00',
      maxMinutesComeLate: 60,
      maxMinutesLeaveEarly: 60,
    },
  },
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
