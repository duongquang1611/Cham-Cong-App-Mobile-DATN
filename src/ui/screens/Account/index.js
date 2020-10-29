import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import actions from '../../../redux/actions';
import {HeaderView} from '../../components';

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
        titleScreen={'Thông tin tài khoản'}
        colorIconBack="white"
        nonShowBack={!isLoginSuccess}
      />
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
