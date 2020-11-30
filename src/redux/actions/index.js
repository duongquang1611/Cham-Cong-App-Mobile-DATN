import {appNavigate} from '../../navigations';
import types from './actionTypes';
import commonActions from './commonActions';
import authActions from './authActions';
import dayWorkActions from './dayWorkActions';
import companyActions from './companyActions';
import searchActions from './searchActions';
import reportActions from './reportActions';

const actions = {
  ...appNavigate,
  ...commonActions,
  ...authActions,
  ...dayWorkActions,
  ...companyActions,
  ...searchActions,
  ...reportActions,
};

export {types};
export default actions;
