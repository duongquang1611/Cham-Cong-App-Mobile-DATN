import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../../redux/actions';
import {HeaderView} from '../../components';
import LoginView from './LoginView';

const AccountScreen = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const isShowLoading = useSelector(
    (state) => state.commonReducer.isShowLoading,
  );
  const {isLoginSuccess} = authReducer;

  return (
    <>
      <HeaderView
        isToolbar={isLoginSuccess}
        isStatusBar={isLoginSuccess}
        titleScreen={isLoginSuccess ? 'Thông tin tài khoản' : 'Đăng nhập'}
        colorIconBack="white"
        nonShowBack={!isLoginSuccess}
      />
      {isLoginSuccess ? <></> : <LoginView />}
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
