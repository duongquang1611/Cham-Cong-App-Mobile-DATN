import {CommonActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {appNavigate} from '../../../navigations';
import {LoadingView, showAlert} from '../../components';
import NetInfo from '@react-native-community/netinfo';

const SplashScreen = () => {
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );
  const navigation = useNavigation();

  console.log('SplashScreen -> isLoginSuccess', isLoginSuccess);
  useEffect(() => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener((stateNet) => {
      // console.log('Connection type', stateNet.type);
      // console.log('Is connected?', stateNet.isConnected);
      // console.log('isInternetReachable?', stateNet.isInternetReachable);
      // console.log('detail?', stateNet.details);
      // showAlert({msg: JSON.stringify(stateNet.details)});
      if (!stateNet.isConnected) {
        showAlert({msg: 'Vui lòng bật kết nối mạng để sử dụng ứng dụng'});
      } else if (!stateNet.isInternetReachable) {
        // ket noi nhung k co quyen truy cap internet
        showAlert({
          msg:
            'Kết nối mạng hiện tại không có quyền truy cập internet. Vui lòng thử lại.',
        });
      }
    });

    // Unsubscribe
    return () => {
      unsubscribe();
    };
  }, []);
  useEffect(() => {
    let nameRouter = isLoginSuccess ? 'DrawerStack' : 'LoginScreen';
    // let nameRouter = isLoginSuccess ? 'HomeScreen' : 'LoginScreen';
    appNavigate.navWhenChangeStatusLogin(navigation.dispatch, nameRouter);
  }, [isLoginSuccess]);
  return <></>;
};

export default SplashScreen;

const styles = StyleSheet.create({});
