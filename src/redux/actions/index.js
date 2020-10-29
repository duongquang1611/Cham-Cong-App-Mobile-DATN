import {appNavigate} from '../../navigations';
import types from './actionTypes';
import commonActions from './commonActions';
import authActions from './authActions';

const actions = {
  ...appNavigate,
  ...commonActions,
  ...authActions,
};

export {types};
export default actions;
