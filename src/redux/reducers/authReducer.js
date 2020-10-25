import moment from 'moment';
import {types} from '../actions';

const initialState = {};
const REHYDRATE = 'persist/REHYDRATE';

export default function authReducer(state = initialState, action) {
  // if (
  //   action.type === REHYDRATE &&
  //   action.payload &&
  //   action.payload.authReducer &&
  //   action.payload.authReducer.token
  // ) {
  //   console.log('persisted: ', action.payload);
  //   carHeroAPI.defaults.headers.common.Authorization = `Bearer ${
  //     action.payload.authReducer.token
  //   }`;
  // }
  switch (action.type) {
    default:
      return state;
  }
}
