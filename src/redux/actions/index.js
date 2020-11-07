import {appNavigate} from '../../navigations';
import types from './actionTypes';
import commonActions from './commonActions';
import authActions from './authActions';
import dayWorkActions from './dayWorkActions';
import companyActions from './companyActions';

const actions = {
  ...appNavigate,
  ...commonActions,
  ...authActions,
  ...dayWorkActions,
  ...companyActions,
};

export {types};
export default actions;
