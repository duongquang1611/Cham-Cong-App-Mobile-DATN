import {REHYDRATE} from 'redux-persist';
import models from '../../models';
import {types} from '../actions';

const initialState = {
  isLoginSuccess: null,
  isLogoutSuccess: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    // case REHYDRATE: {
    //   console.log(state);
    //   return {
    //     ...state,
    //   };
    // }
    case types.LOGIN.SUCCESS: {
      models.handleLogin(action.data);
      return Object.assign({}, state, {
        isLoginSuccess: true,
        isLogoutSuccess: false,
      });
    }
    case types.LOGOUT.SUCCESS: {
      models.handleSignOut();
      return Object.assign({}, state, {
        isLoginSuccess: false,
        isLogoutSuccess: true,
      });
    }

    default:
      return state;
  }
}
