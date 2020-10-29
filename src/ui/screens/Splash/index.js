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
    let nameRouter = isLoginSuccess ? 'HomeScreen' : 'LoginScreen';
    appNavigate.navToOtherScreen(navigation.dispatch, nameRouter);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: nameRouter}],
      }),
    );
  }, [isLoginSuccess]);
  return <View style={{flex: 1, backgroundColor: 'white'}}></View>;
};

export default SplashScreen;

const styles = StyleSheet.create({});
