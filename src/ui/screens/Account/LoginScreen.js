import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Keyboard, Text, TextInput, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import {appNavigate} from '../../../navigations';
import API from '../../../networking';
import actions from '../../../redux/actions';
import commons from '../../commons';
import {
  ButtonView,
  HeaderView,
  IconView,
  InputView,
  LoadingView,
} from 'cc-components';
import styles from './styles';
import {useForm} from 'react-hook-form';
import InputController from '../InputController';

const LoginScreen = (props) => {
  let autoFocus = props.autoFocus == undefined ? false : props.autoFocus;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  // const {control, handleSubmit, errors, register, setValue} = useForm();
  const form = useForm();
  const {control, handleSubmit, errors, register, setValue} = form;
  const handleRequetsLogin = async (formData) => {
    Keyboard.dismiss();
    console.log('paramsLogin', formData);
    dispatch(actions.isShowLoading(true));
    try {
      let res = await API.POST(API.signin, formData);
      // console.log('LoginScreen -> res', res);
      if (res && res.user && res.user._id) {
        let data = {
          userId: res.user._id,
          token: res.token,
          roleId: res.user.roleId._id,
        };
        // save user info to realm
        models.saveUserInfoData(res.user);
        // save login token to redux
        dispatch(actions.responseLoginSuccess(data));
        dispatch(actions.saveUserData(res.user));
      }
      dispatch(actions.isShowLoading(false));
    } catch (error) {
      console.log('handleRequetsLogin -> error', error);
      dispatch(actions.isShowLoading(false));
    }
  };

  const navigateToForgotPassword = () => {
    // refDialog && refDialog.hideDialog();
    // AppNavigate.navigateToForgotPasswrodScreen(navigation.dispatch);
  };
  const navigateToRegister = () => {
    // refDialog && refDialog.hideDialog();
    // AppNavigate.navigateToRegisterScreen(navigation.dispatch);
  };
  const navigateToSetupServer = () => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'SetupServer', {
      preRoute: 'login',
    });
  };

  return (
    <>
      <HeaderView
        isToolbar={true}
        isStatusBar={true}
        nonShowBack
        titleScreen={''}
        colorIconBack="white"
      />
      <View
        style={{
          position: 'absolute',
          right: 20,
          top: commons.heightHeader,
          zIndex: 100,
        }}>
        <IconView
          name="settings"
          size={28}
          onPress={navigateToSetupServer}
          color="white"
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: commons.colorMain,
        }}>
        {isLoading && <LoadingView />}
        <View style={styles.containerFormInput}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: commons.fontSizeHeader,
              color: commons.colorMain,
              fontWeight: 'bold',
              marginBottom: 15,
            }}>
            Đăng nhập
          </Text>
          <InputController
            {...{
              name: 'username',
              label: 'Tên tài khoản',
              placeholder: 'Nhập tên tài khoản',
              initRules: {
                required: {
                  value: true,
                  message: 'Tên tài khoản không được để trống.',
                },
              },
              form,
            }}
          />
          <InputController
            {...{
              name: 'password',
              label: 'Mật khẩu',
              placeholder: 'Nhập mật khẩu',
              initRules: {
                required: {
                  value: true,
                  message: 'Mật khẩu không được để trống.',
                },
                minLength: {
                  value: 6,
                  message: 'Mật khẩu cần ít nhất 6 ký tự.',
                },
              },
              secureTextEntry: true,
              form,
              multiline: false,
            }}
          />
          <ButtonView
            onPress={handleSubmit(handleRequetsLogin)}
            title={'Đăng nhập'}
            style={styles.styleButtonFocus}
            styleTitle={styles.styleTextButton}
          />
          {/* <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TextView
            onPress={navigateToRegister}
            style={styles.styleContainrTextLink}
            styleText={styles.styleTextLink}
            styleContainerText={{
              justifyContent: 'center',
            }}>
            {'Chưa có tài khoản'}
          </TextView>
          <TextView
            onPress={navigateToForgotPassword}
            style={[styles.styleContainrTextLink, {justifyContent: 'flex-end'}]}
            styleText={styles.styleTextLink}
            styleContainerText={{
              justifyContent: 'center',
            }}>
            {'Quên mật khẩu?'}
          </TextView>
        </View> */}
        </View>
      </View>
    </>
  );
};

export default LoginScreen;
