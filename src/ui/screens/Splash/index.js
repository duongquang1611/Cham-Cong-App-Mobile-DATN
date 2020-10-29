import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {LoadingView} from '../../components';

const SplashScreen = () => {
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );
  console.log('SplashScreen -> isLoginSuccess', isLoginSuccess);
  return <LoadingView />;
};

export default SplashScreen;

const styles = StyleSheet.create({});
