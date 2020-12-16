import {
  HeaderMenuDrawer,
  HeaderView,
  LoadingView,
  showAlert,
} from 'cc-components';
import React, {memo, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import InputController from '../../../InputController';

import {BottomButton} from 'cc-components';
import styles from './styles';
import {useForm} from 'react-hook-form';
import API from '../../../../../networking';
import commons from '../../../../commons';
const AddCompany = (props) => {
  const form = useForm();
  const {control, handleSubmit, errors, register, setValue} = form;
  const [state, setState] = useState({
    isLoading: false,
  });
  const onSubmit = async (formData) => {
    console.log(
      '🚀 ~ file: index.js ~ line 14 ~ onSubmit ~ formData',
      formData,
    );
    setState({...state, isLoading: true});

    try {
      let res = await API.POST(API.searchCompanies, formData);
      if (res && res._id) {
        showAlert({msg: 'Tạo mới công ty thành công.'});
        setState({...state, isLoading: false});
      } else {
        setState({...state, isLoading: false});
      }
    } catch (error) {
      setState({...state, isLoading: false});
      console.log('Add company error', error);
    }
  };

  return (
    <>
      <HeaderView
        isToolbar={true}
        isStatusBar={true}
        // nonShowBack
        titleScreen={'Thêm công ty'}
        colorIconBack="white"
      />
      {state.isLoading && <LoadingView />}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginBottom: 50}}
        contentContainerStyle={styles.containerScrollView}>
        <InputController
          {...{
            name: 'name',
            label: 'Tên công ty',
            placeholder: 'Nhập tên công ty',
            initRules: {
              required: {
                value: true,
                message: 'Tên công ty không được để trống.',
              },
            },
            form,
          }}
        />
        <InputController
          {...{
            name: 'phoneNumber',
            label: 'Số điện thoại',
            placeholder: 'Nhập số điện thoại',
            keyboardType: 'phone-pad',
            initRules: {
              pattern: {
                value: commons.PHONE_NUMBER_REGEX,
                message: 'Số điện thoại không hợp lệ.',
              },
            },
            form,
          }}
        />

        <InputController
          {...{
            name: 'email',
            label: 'Email',
            placeholder: 'Nhập Email',
            keyboardType: 'email-address',
            initRules: {
              pattern: {
                value: commons.EMAIL_REGEX,
                message: 'Email không hợp lệ',
              },
            },
            form,
          }}
        />
        <InputController
          {...{
            name: 'address',
            label: 'Địa chỉ',
            placeholder: 'Nhập địa chỉ',
            form,
          }}
        />

        <InputController
          {...{
            name: 'website',
            label: 'Website Công ty',
            placeholder: 'Nhập website công ty',
            form,
          }}
        />
        <InputController
          {...{
            name: 'representativeName',
            label: 'Tên người đại diện',
            placeholder: 'Nhập tên người đại diện',
            form,
          }}
        />
        <InputController
          {...{
            name: 'representativePhoneNumber',
            label: 'Số điện thoại người đại diện',
            placeholder: 'Nhập số điện thoại người đại diện',
            keyboardType: 'phone-pad',
            initRules: {
              pattern: {
                value: commons.PHONE_NUMBER_REGEX,
                message: 'Số điện thoại không hợp lệ.',
              },
            },
            form,
          }}
        />

        <InputController
          {...{
            name: 'representativeEmail',
            label: 'Email người đại diện',
            placeholder: 'Nhập Email người đại diện',
            keyboardType: 'email-address',
            initRules: {
              pattern: {
                value: commons.EMAIL_REGEX,
                message: 'Email không hợp lệ',
              },
            },
            form,
          }}
        />
      </ScrollView>
      <BottomButton
        id={'Submit'}
        onPress={handleSubmit(onSubmit)}
        // onPress={() => setValue('roleId', 'xxxxxxxx')}
        text="Tạo mới công ty"
      />
    </>
  );
};

export default memo(AddCompany);
