import {useNavigation} from '@react-navigation/native';
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
    if (isLoginSuccess) {
      appNavigate.navToOtherScreen(navigation.dispatch, {}, 'HomeScreen');
    } else {
      appNavigate.navToAccountScreen(navigation.dispatch);
    }
  }, [isLoginSuccess]);
  return <View style={{flex: 1, backgroundColor: 'white'}}></View>;
};

export default SplashScreen;

const styles = StyleSheet.create({});
