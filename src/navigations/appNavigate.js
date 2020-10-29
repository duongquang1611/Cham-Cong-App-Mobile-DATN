import {StackActions, CommonActions} from '@react-navigation/native';
import models from '../models';

const navWhenChangeStatusLogin = (dispatch, nameRouter) => {
  console.log('navWhenChangeStatusLogin -> nameRouter', nameRouter);
  dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: nameRouter}],
    }),
  );
};

function navToOtherScreen(dispatch, nameScreen, params) {
  dispatch(StackActions.push(nameScreen, params));
}
function navToAccountScreen(dispatch, params) {
  dispatch(StackActions.push('AccountScreen', params));
}

export default {navWhenChangeStatusLogin, navToOtherScreen, navToAccountScreen};
