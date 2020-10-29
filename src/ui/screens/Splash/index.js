import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {appNavigate} from '../../../navigations';
import {LoadingView} from '../../components';

const SplashScreen = () => {
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );
  const navigation = useNavigation();
  console.log('SplashScreen -> isLoginSuccess', isLoginSuccess);

  useEffect(() => {
    let nameRouter = isLoginSuccess ? 'DrawerStack' : 'LoginScreen';
    // let nameRouter = isLoginSuccess ? 'HomeScreen' : 'LoginScreen';
    appNavigate.navWhenChangeStatusLogin(navigation.dispatch, nameRouter);
  }, [isLoginSuccess]);
  return <></>;
};

export default SplashScreen;

const styles = StyleSheet.create({});
