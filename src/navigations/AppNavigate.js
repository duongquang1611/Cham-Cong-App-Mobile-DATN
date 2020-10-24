import {StackActions, CommonActions} from '@react-navigation/native';

function navToOtherScreen(dispatch, params, nameScreen) {
  dispatch(StackActions.push(nameScreen, params));
}
function navToAccountScreen(dispatch, params) {
  dispatch(StackActions.push('AccountScreen', params));
}

const AppNavigate = {
  navToOtherScreen,
  navToAccountScreen,
};

export default AppNavigate;
