import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import actions from '../../../redux/actions';
import commons from '../../commons';
import {HeaderMenuDrawer, HeaderView} from '../../components';

const AccountScreen = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const {isLoginSuccess} = authReducer;
  const navigation = useNavigation();
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Thông tin người dùng'} />
      <Text>{JSON.stringify(models.getUserInfo())}</Text>
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
