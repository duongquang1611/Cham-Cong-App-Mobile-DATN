import {useNavigation} from '@react-navigation/native';
import {ButtonView, HeaderMenuDrawer, showAlert} from 'cc-components';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import baseStyles from '../../../baseStyles';
import API from '../../../networking';
import commons from '../../commons';
import InputController from '../InputController';

const LabelView = (props) => {
  const {title = ''} = props;
  return (
    <Text
      style={{
        fontStyle: 'normal',
        fontSize: commons.fontSize16,
        fontWeight: 'bold',
      }}>
      {title}
    </Text>
  );
};
const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const {isLoginSuccess} = authReducer;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm();
  const {handleSubmit, reset, watch} = form;
  const changePassword = async (formData) => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      let res = await API.PUT(API.changePassword, formData);
      setIsLoading(false);

      if (res && res._id) {
        showAlert({msg: 'Cập nhật mật khẩu thành công.'});
      }
    } catch (error) {
      setIsLoading(false);

      console.log({changePassword: error});
    }
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Đổi mật khẩu'} />
      <View style={styles.container}>
        {/* <LinearGradient
          locations={[0, 0.2, 0.7]}
          colors={commons.colorsLinearGradient}
          style={{
            height: 50,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
        </LinearGradient> */}

        <InputController
          {...{
            name: 'oldPassword',
            label: 'Mật khẩu cũ',
            placeholder: 'Nhập mật khẩu cũ',
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
        <InputController
          {...{
            name: 'newPassword',
            label: 'Mật khẩu mới',
            placeholder: 'Nhập mật khẩu mới',
            initRules: {
              required: {
                value: true,
                message: 'Mật khẩu không được để trống.',
              },
              validate: (value) => {
                if (value === watch('oldPassword'))
                  return 'Mật khẩu mới không được giống mật khẩu cũ.';
                else return true;
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
        <InputController
          {...{
            name: 'confirmPassword',
            label: 'Nhập lại mật khẩu',
            placeholder: 'Nhập lại mật khẩu',
            initRules: {
              required: {
                value: true,
                message: 'Mật khẩu không được để trống.',
              },
              validate: (value) => {
                if (value !== watch('newPassword'))
                  return 'Mật khẩu không trùng khớp với mật khẩu mới.';
                else return true;
              },
            },
            secureTextEntry: true,
            form,
            multiline: false,
          }}
        />
        {isLoading ? (
          <View
            style={{
              ...styles.styleButtonFocus,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ActivityIndicator size="small" color="white" />
          </View>
        ) : (
          <ButtonView
            onPress={handleSubmit(changePassword)}
            title={'Cập nhật mật khẩu'}
            style={styles.styleButtonFocus}
            styleTitle={styles.styleTextButton}
          />
        )}

        <ButtonView
          onPress={() => reset()}
          title={'Hủy'}
          style={{
            ...styles.styleButtonFocus,
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderWidth: 0,
          }}
          styleTitle={styles.styleTextButton}
        />
      </View>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  ...baseStyles,
  container: {
    flex: 1,
    marginVertical: 15,
    marginHorizontal: 15,
  },
  styleButtonFocus: {
    ...baseStyles.buttonFilledFocus,
    marginTop: commons.margin15,
    marginBottom: commons.margin8,
  },
  styleTextButton: {
    fontSize: commons.fontSize16,
    margin: 3,
    color: 'white',
  },
});
