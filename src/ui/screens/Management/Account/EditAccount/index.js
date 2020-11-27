import {HeaderView, LoadingView, showAlert, TextView} from 'cc-components';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import baseStyles from '../../../../../baseStyles';
import InputController from '../../InputController';
import {BottomButton} from 'cc-components';
import commons from '../../../../commons';
import models from '../../../../../models';
import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import API from '../../../../../networking';
import moment from 'moment';
import {useRoute} from '@react-navigation/native';
// Nữ:0, Nam:1
const GENDER = [
  {_id: 0, name: 'Nữ'},
  {_id: 1, name: 'Nam'},
];
let dataSheet = [];
let titleSheet = '';
let typeParamChoose = '';
let dateOfBirth = moment();
const viewSeparator = () => {
  return <View style={{height: 1, backgroundColor: commons.border}} />;
};
const EditAccount = (props) => {
  const {control, handleSubmit, errors, register, setValue, reset} = useForm();
  const route = useRoute();
  const {data} = route.params;
  let user = models.getUserInfo();
  const [state, setState] = useState({
    percentHeight: 0,
    isVisibleModalDate: false,
    refreshing: true,
    isLoading: false,
    allCompanies: [],
    allRoles: [],
    allUsers: [],
  });
  const refBottomSheet = useRef();

  // useEffect(() => {
  //   if (state.dataSheet.length > 0) {
  //     refBottomSheet.current.open();
  //   }
  // }, [state.dataSheet]);
  const getData = async () => {
    try {
      let data = await Promise.all([
        API.GET(API.searchCompanies),
        API.GET(API.allRoles),
        API.GET(API.searchUsersPublic, {}),
      ]);
      // console.log('🚀 ~ file: index.js ~ line 47 ~ getData ~ data', data);
      if (
        data[0] &&
        data[1] &&
        data[2] &&
        Array.isArray(data[0]) &&
        Array.isArray(data[1]) &&
        Array.isArray(data[2])
      ) {
        setState({
          ...state,
          refreshing: false,
          allCompanies: data[0],
          allRoles: data[1],
          allUsers: data[2],
        });
      } else {
        setState({...state, refreshing: false});
      }
    } catch (error) {
      console.log('🚀 ~ file: index.js ~ line 83 ~ getData ~ error', error);
      setState({...state, refreshing: false});
    }
  };
  useEffect(() => {
    state.refreshing && getData();
  }, [state.refreshing]);

  const onRefresh = () => {
    setState({...state, refreshing: true});
  };
  useEffect(() => {
    state.percentHeight > 0
      ? refBottomSheet.current.open()
      : refBottomSheet.current.close();
  }, [state.percentHeight]);

  const hideBottomSheet = () => {
    setState({...state, percentHeight: 0});
  };
  const onSubmit = async (formData) => {
    console.log('🚀 ~ file: index.js ~ line 14 ~ onSubmit ~ data', formData);
    setState({...state, isLoading: true});

    try {
      let res = await API.PUT(API.detailUser(data._id), formData);
      if (res && res._id) {
        showAlert({msg: 'Cập nhật tài khoản thành công.'});
        setState({...state, isLoading: false});
      } else {
        setState({...state, isLoading: false});
      }
    } catch (error) {
      setState({...state, isLoading: false});
      console.log('Signup error', error);
    }
  };
  const onSelectedItem = ({data}) => {
    hideBottomSheet();
    setValue(typeParamChoose, data.name);

    switch (typeParamChoose) {
      case 'companyName': {
        setValue('companyId', data._id.toString());
        break;
      }
      case 'roleName': {
        setValue('roleId', data._id.toString());
        break;
      }

      case 'parentName': {
        setValue('parentId', data._id.toString());
        break;
      }
      case 'genderName': {
        setValue('gender', data._id.toString());
        break;
      }

      default:
        break;
    }
  };
  const renderItemSelect = ({item, index}) => {
    // let isChecked = isItemChecked(item, typeParamChoose);
    return (
      <TextView
        data={item}
        // nameIconRight={'icon-circle-correct'}
        // colorIconRight="green"
        onPress={onSelectedItem}
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
          renderItem={renderItemSelect}
        />
      </View>
    );
  };
  const showBottomSheet = ({id, data = []}) => {
    typeParamChoose = id;
    dataSheet = data;
    let isShowSheet = true;
    switch (id) {
      case 'companyName': {
        titleSheet = 'Công ty';
        dataSheet = state.allCompanies;
        break;
      }
      case 'roleName': {
        titleSheet = 'Chức vụ';
        dataSheet = state.allRoles;
        break;
      }

      case 'parentName': {
        // isShowSheet = false;
        titleSheet = 'Quản lý trực tiếp';
        dataSheet = state.allUsers;

        break;
      }
      case 'genderName': {
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
    setState({...state, isVisibleModalDate: true});
  };
  const hidePicker = () => {
    setState({...state, isVisibleModalDate: false});
  };
  const handleConfirm = (date) => {
    // onChangeText({id: 'dateOfBirth', data: date});
    console.log('🚀 ~ file: index.js ~ line 193 ~ handleConfirm ~ date', date);
    dateOfBirth = date;
    setValue('dateName', moment(date).format(commons.FORMAT_DATE_VN));
    setValue('dateOfBirth', moment(date).toISOString());
    hidePicker();
  };

  return (
    <>
      <DateTimePickerModal
        mode={'date'}
        isVisible={state.isVisibleModalDate}
        date={new Date(dateOfBirth)}
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
        titleScreen={'Cập nhật tài khoản'}
        colorIconBack="white"
      />
      {state.refreshing && <LoadingView />}
      {state.isLoading && <LoadingView />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, marginBottom: 50}}
        contentContainerStyle={styles.containerScrollView}
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }>
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
            defaultValue: data?.username,
            errors,
            control,
          }}
        />
        {/* <InputController
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
            editable: false,
            isShowClean: false,
            defaultValue: data?.password,
            errors,
            control,
          }}
        /> */}
        <InputController
          {...{
            name: 'name',
            label: 'Họ tên',
            placeholder: 'Nhập họ tên',
            initRules: {
              required: {
                value: true,
                message: 'Họ tên không được để trống.',
              },
            },
            defaultValue: data?.name,
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'companyName',
            label: 'Công ty',
            placeholder: 'Chọn công ty',
            editable: false,
            // onPressText: showBottomSheet,
            defaultValue: data?.companyId ? data?.companyId?.name : null,
            isShowClean: false,
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'roleName',
            label: 'Chức vụ',
            placeholder: 'Chọn chức vụ',
            editable: false,
            onPressText: showBottomSheet,
            defaultValue: data?.roleId ? data?.roleId?.name : null,
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'parentName',
            label: 'Quản lý trực tiếp',
            placeholder: 'Chọn quản lý trực tiếp',
            editable: false,
            onPressText: showBottomSheet,
            defaultValue: data?.parentId ? data?.parentId?.name : null,
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
            defaultValue: data?.phoneNumber,
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'address',
            label: 'Địa chỉ',
            placeholder: 'Nhập địa chỉ',
            defaultValue: data?.address,
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
            defaultValue: data?.email,
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'genderName',
            label: 'Giới tính',
            placeholder: 'Chọn giới tính',
            editable: false,
            onPressText: showBottomSheet,
            defaultValue: data?.gender && GENDER[data.gender].name,
            errors,
            control,
          }}
        />
        <InputController
          {...{
            name: 'dateName',
            label: 'Ngày sinh',
            placeholder: 'Chọn ngày sinh',
            editable: false,
            onPressText: showPicker,
            defaultValue: data?.dateOfBirth
              ? moment(data.dateOfBirth).format(commons.FORMAT_DATE_VN)
              : null,
            errors,
            control,
          }}
        />
        <View
          style={{
            height: 0,
            width: 0,
          }}>
          <InputController
            {...{
              name: 'gender',
              defaultValue: data?.gender ? data?.gender.toString() : null,
              isShowClean: false,
              errors,
              control,
            }}
          />
          <InputController
            {...{
              name: 'companyId',
              isShowClean: false,
              defaultValue: data?.companyId ? data?.companyId._id : null,
              errors,
              control,
            }}
          />
          <InputController
            {...{
              name: 'roleId',
              defaultValue: data?.roleId?._id,
              isShowClean: false,
              errors,
              control,
            }}
          />
          <InputController
            {...{
              name: 'parentId',
              defaultValue: data?.parentId ? data?.parentId._id : null,
              isShowClean: false,
              errors,
              control,
            }}
          />
          <InputController
            {...{
              name: 'dateOfBirth',
              defaultValue: data?.dateOfBirth
                ? moment(data?.dateOfBirth).toISOString()
                : null,
              isShowClean: false,
              errors,
              control,
            }}
          />
        </View>
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
        id={'submit'}
        idCancel={'cancel'}
        textCancel="Đặt lại"
        onPressCancel={() => reset()}
        showCancel={true}
        onPress={handleSubmit(onSubmit)}
        // onPress={() => setValue('roleId', 'xxxxxxxx')}
        text="Cập nhật"
      />
    </>
  );
};

export default memo(EditAccount);

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
