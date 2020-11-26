import {HeaderView, TextView} from 'cc-components';
import React, {memo, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, Text, View, ScrollView, FlatList} from 'react-native';
import baseStyles from '../../../../../baseStyles';
import InputController from '../../InputController';
import {BottomButton} from 'cc-components';
import commons from '../../../../commons';
import models from '../../../../../models';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Nữ:0, Nam:1
const GENDER = [
  {id: 0, name: 'Nữ'},
  {id: 1, name: 'Nam'},
];
let dataSheet = [];
let titleSheet = '';
let typeParamChoose = '';

const viewSeparator = () => {
  return <View style={{height: 1, backgroundColor: commons.border}} />;
};
const AddAccount = (props) => {
  const {control, handleSubmit, errors, register, setValue} = useForm();
  let user = models.getUserInfo();
  const [state, setState] = useState({
    percentHeight: 0,
    isVisibleModalDate: false,
  });
  const refBottomSheet = useRef();

  // useEffect(() => {
  //   if (state.dataSheet.length > 0) {
  //     refBottomSheet.current.open();
  //   }
  // }, [state.dataSheet]);

  useEffect(() => {
    state.percentHeight > 0
      ? refBottomSheet.current.open()
      : refBottomSheet.current.close();
  }, [state.percentHeight]);

  const hideBottomSheet = () => {
    setState({...state, percentHeight: 0});
  };
  const onSubmit = (data) => {
    console.log('🚀 ~ file: index.js ~ line 14 ~ onSubmit ~ data', data);
  };
  const renderItemFilter = ({item, index}) => {
    // let isChecked = isItemChecked(item, typeParamChoose);
    return (
      <TextView
        data={item}
        // nameIconRight={'icon-circle-correct'}
        // colorIconRight="green"
        // onPress={handleChooseItemField}
        style={{
          ...styles.styleContainerItemSheet,
          backgroundColor: 'transparent',
        }}
        styleText={{
          ...styles.itemSheet,
          fontWeight: 'normal',
        }}
        styleContainerText={styles.containerItemSheet}>
        {item.name}
      </TextView>
    );
  };
  const HeaderBottomSheet = () => {
    return (
      <HeaderView
        isToolbar={true}
        isStatusBar={false}
        titleScreen={titleSheet}
        styleTitle={{color: commons.colorMain, backgroundColor: 'transparent'}}
        styleHeader={{
          backgroundColor: commons.border,
        }}
        colorsLinearGradient={['white', 'white', 'white']}
        nameIconBack="clear"
        colorIconBack={commons.colorMain}
        onPressBack={hideBottomSheet}
        // renderToolbarBottom={
        //   typeParamChoose === TypeParams.Province && (
        //     <Text>render province suggest</Text>
        //   )
        // }
      />
    );
  };
  const ContentBottomSheet = () => {
    return (
      <View style={{height: '100%'}}>
        <HeaderBottomSheet />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataSheet}
          scrollEnabled
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
          ItemSeparatorComponent={viewSeparator}
          style={{backgroundColor: 'white'}}
          contentContainerStyle={{
            justifyContent: 'center',
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItemFilter}
        />
      </View>
    );
  };
  const showBottomSheet = ({id, data = []}) => {
    typeParamChoose = id;
    dataSheet = data;
    let isShowSheet = true;
    switch (id) {
      case 'companyId': {
        titleSheet = 'Công ty';
        break;
      }
      case 'roleId': {
        titleSheet = 'Chức vụ';
        break;
      }

      case 'parentId': {
        // isShowSheet = false;
        titleSheet = 'Quản lý trực tiếp';

        break;
      }
      case 'gender': {
        titleSheet = 'Giới tính';
        dataSheet = GENDER;
        break;
      }

      default:
        break;
    }
    if (isShowSheet) {
      let allHeight = (dataSheet.length + 1) * commons.heightDefault;
      let height =
        allHeight < commons.SCREEN_HEIGHT ? allHeight : commons.SCREEN_HEIGHT;

      // console.log(allHeight, height);
      setState({...state, percentHeight: height + 50});
    }
  };

  const showPicker = () => {
    setState({...state, isVisibleDate: true});
  };
  const hidePicker = () => {
    setState({...state, isVisibleDate: false});
  };
  const handleConfirm = (date) => {
    // onChangeText({id: 'dateOfBirth', data: date});
    console.log('🚀 ~ file: index.js ~ line 193 ~ handleConfirm ~ date', date);
    hidePicker();
  };

  return (
    <>
      <DateTimePickerModal
        mode={'date'}
        isVisible={state.isVisibleModalDate}
        // date={
        //   newUserInfo?.dateOfBirth || userInfo?.dateOfBirth
        //     ? new Date(newUserInfo?.dateOfBirth || userInfo?.dateOfBirth)
        //     : new Date()
        // }
        locale="vi"
        confirmTextIOS="Thay Đổi"
        cancelTextIOS="Hủy"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
      <HeaderView
        isToolbar={true}
        isStatusBar={true}
        // nonShowBack
        titleScreen={'Tạo tài khoản'}
        colorIconBack="white"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginBottom: 60}}
        contentContainerStyle={styles.containerScrollView}>
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
            errors,
            control,
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
            errors,
            control,
          }}
        />

        <InputController
          {...{
            name: 'companyId',
            label: 'Công ty',
            placeholder: 'Chọn công ty',
            editable: false,
            showBottomSheet,
            errors,
            control,
          }}
        />

        <InputController
          {...{
            name: 'roleId',
            label: 'Chức vụ',
            placeholder: 'Chọn chức vụ',
            editable: false,
            showBottomSheet,
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'parentId',
            label: 'Quản lý trực tiếp',
            placeholder: 'Chọn quản lý trực tiếp',
            editable: false,
            showBottomSheet,
            errors,
            control,
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
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'address',
            label: 'Địa chỉ',
            placeholder: 'Nhập địa chỉ',
            errors,
            control,
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
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'gender',
            label: 'Giới tính',
            placeholder: 'Chọn giới tính',
            editable: false,
            showBottomSheet,
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'dateOfBirth',
            label: 'Ngày sinh',
            placeholder: 'Chọn ngày sinh',
            editable: false,
            errors,
            control,
          }}
        />
        <RBSheet
          ref={refBottomSheet}
          animationType="slide"
          height={state.percentHeight}
          onClose={hideBottomSheet}
          openDuration={250}
          closeOnPressBack={true}
          closeOnPressMask={true}
          customStyles={{
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            },
          }}>
          <ContentBottomSheet />
        </RBSheet>
      </ScrollView>
      <BottomButton
        id={'Submit'}
        // onPress={handleSubmit(onSubmit)}
        onPress={() => setValue('roleId', 'xxxxxxxx')}
        text="Tạo tài khoản"
      />
    </>
  );
};

export default memo(AddAccount);

const styles = StyleSheet.create({
  ...baseStyles,
  styleContainerItemSheet: {
    height: commons.heightDefault,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: commons.margin,
  },
  itemSheet: {
    fontSize: commons.fontSize16,
    fontWeight: '800',
  },
  containerItemSheet: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
