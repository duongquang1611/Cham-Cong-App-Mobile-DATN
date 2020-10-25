import {appNavigate} from '../../navigations';
import types from './actionTypes';
import commonsActions from './commonActions';

const actions = {
  ...appNavigate,
  ...commonsActions,
};

export {types};
export default actions;
