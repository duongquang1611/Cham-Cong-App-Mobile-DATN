import {Alert, Platform} from 'react-native';
import DbHelper from './DbHelper';
import {LoginEntity} from '../entity';
import {clearUserInfo} from './UserBO';
class LoginBO extends DbHelper {
  constructor() {
    super(LoginEntity);
  }

  clearLogin(isShowMessage = true) {
    let loginData = this.getAll();
    if (loginData) {
      this.deleteRow(loginData);
      return true;
    } else {
      if (isShowMessage) {
        alert('Thông tin đăng nhập đã trống trước đó.');
      }
    }
    return false;
  }

  getTokenSignIn() {
    let loginData = this.getAll();
    if (loginData && loginData.length > 0 && loginData[0].Token) {
      return loginData[0].Token;
    }
    return null;
  }

  isLoggedIn() {
    return this.getTokenSignIn() ? true : false;
  }

  // static schema = LoginEntity;
}

//Luu Du lieu khi thuc hien Login
export function handleLogin(responseData) {
  let loginBO = new LoginBO();
  loginBO.clearLogin();
  if (responseData.id_token) {
    let loginData = {Token: responseData.id_token};
    loginBO.insertOrUpdate(loginData, true);
    return true;
  }
  return false;
}

export function handleSignOut() {
  clearUserInfo();
  new LoginBO().clearLogin(false);
  return true;
}

//Lay Token Login
export function getTokenSignIn() {
  return new LoginBO().getTokenSignIn();
}

//Lay Token Login
export function isLoggedIn() {
  return new LoginBO().getTokenSignIn() ? true : false;
}

//Lay Token Login
export function roleOfUser() {
  return new LoginBO().getTokenSignIn() ? true : false;
}

export function handleSignUp() {
  return true;
}
