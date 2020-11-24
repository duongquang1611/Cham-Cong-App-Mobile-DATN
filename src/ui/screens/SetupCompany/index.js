import {useNavigation} from '@react-navigation/native';
import {
  HeaderMenuDrawer,
  LoadingView,
  showAlert,
  TextView,
} from 'cc-components';
import React, {useEffect, useState, useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import baseStyles from '../../../baseStyles';
import models from '../../../models';
import {appNavigate} from '../../../navigations';
import API from '../../../networking';
import commons from '../../commons';
import TextInputController from './TextInputController';
import styles from './styles';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {useNetInfo} from '@react-native-community/netinfo';
import {getLocation} from '../../commons/location';

let currentPicker = '';
let form = {};
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
const TextRequired = () => {
  return <Text style={styles.error}>{'Vui lòng điền đầy đủ thông tin'}</Text>;
};
const SetupCompany = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigateToChooseAddress = () => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'ChooseAddress');
  };
  let netInfo = useNetInfo();

  const detailCompany = useSelector(
    (state) => state.companyReducer.detailCompany,
  );
  const {control, handleSubmit, errors, register, setValue} = useForm();
  // const {control, handleSubmit, errors, register} = useForm();
  // console.log('SetupCompany -> detailCompany', detailCompany);
  const {config = {}} = detailCompany;
  let user = models.getUserInfo();

  const [state, setState] = useState({
    refreshing: true,
    isEditing: false,
    isDatePickerVisible: false,
    isGranted: false,
  });
  useEffect(() => {
    state.refreshing && getData();
    return () => {};
  }, [state.refreshing]);

  useEffect(() => {
    // register('checkin');
    // register('checkout');
    // register('allowCheckin');
    // register('allowCheckout');
  }, [register]);

  useEffect(() => {
    state.isGranted && onPressUseDefault({id: 'location'});
  }, [state.isGranted]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //To Check, If Permission is granted
        setState({
          ...state,
          isGranted: true,
        });
      } else {
        showAlert({msg: 'Permission Denied.'});
      }
    } catch (err) {
      console.log('ChooseAddress -> err', err);
      showAlert({msg: err.message});
    }
  };
  const onSubmit = (data) => {
    let formatForm = {};
    if (commons.isEmptyObject(form)) {
      formatForm = {...config};
    } else
      Object.entries(form).map(([key, value]) => {
        formatForm[key] = moment(value).format(commons.FORMAT_TIME_DIFF);
      });
    let updateData = {...formatForm, companyId: user?.companyId?._id, ...data};
    API.postConfigCompany(dispatch, updateData);
    onRefresh();
  };

  const getData = async () => {
    setState({...state, refreshing: false});
    if (user && user?.companyId && user?.companyId?._id) {
      API.getDetailCompany(user?.companyId?._id, dispatch);
    }
  };
  const handleDateConfirm = (date) => {
    form[currentPicker] = date;
    // setValue(currentPicker, moment(date).format(commons.FORMAT_TIME_DIFF));
    hideDatePicker();
  };

  const showDatePicker = ({id}) => {
    currentPicker = id;
    console.log('showDatePicker -> currentPicker', currentPicker);
    setState({
      ...state,
      isDatePickerVisible: true,
    });
  };

  const hideDatePicker = () => {
    console.log(
      '🚀 ~ file: index.js ~ line 119 ~ hideDatePicker ~ state',
      state,
    );
    setState({
      ...state,
      isDatePickerVisible: false,
    });
  };

  const onRefresh = () => {
    setState({...state, refreshing: true, isEditing: false});
  };
  const onPressEdit = () => {
    setState({...state, isEditing: !state.isEditing});
  };

  const RowTextView = (props) => {
    const {title = '', onPress, id = '', value = ''} = props;
    return (
      <View style={styles.containerRow}>
        <Text style={{flex: 1, fontSize: 16}}>{title}</Text>
        <View style={{flex: 0.2}} />
        <TextView
          id={id}
          onPress={state.isEditing ? showDatePicker : null}
          style={{flex: 2, ...styles.input}}
          value={value}
          styleValue={{
            color: 'black',
            marginVertical: 15,
            fontSize: commons.fontSize15,
          }}
        />
      </View>
    );
  };

  const onPressUseDefault = async ({id}) => {
    console.log(
      '🚀 ~ file: index.js ~ line 217 ~ onPressUseDefault ~ id',
      id,
      state.isGranted,
    );
    try {
      switch (id) {
        case 'ipAddress':
          if (netInfo?.details?.ipAddress) {
            setValue(id, netInfo?.details?.ipAddress);
          }
          break;

        case 'location':
          if (state.isGranted) {
            let location = await getLocation();
            if (location?.latitude) {
              setValue('lat', location.latitude.toString());
              setValue('long', location.longitude.toString());
            }
          } else {
            requestLocationPermission();
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(
        '🚀 ~ file: index.js ~ line 155 ~ onPressUseDefault ~ error',
        error,
      );
    }
  };
  return (
    <>
      <HeaderMenuDrawer
        titleScreen="Cấu hình công ty"
        showMenuRight={!state.isEditing}
        // nameMenuRight={state.isEditing ? 'content-save' : 'account-edit'}
        nameMenuRight={'account-edit'}
        typeMenuRight="MaterialCommunityIcons"
        onPressMenuRight={onPressEdit}
        colorMenuRight="white"
        sizeMenuRight={commons.sizeIcon28}
        styleMenuRight={{marginRight: 5}}
      />

      <DateTimePickerModal
        mode={'time'}
        isVisible={state.isDatePickerVisible}
        date={
          currentPicker && form[currentPicker]
            ? new Date(form[currentPicker])
            : new Date()
        }
        locale="vi"
        confirmTextIOS="Thay Đổi"
        cancelTextIOS="Hủy"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />

      {state.refreshing && <LoadingView />}
      {/* {"accuracy": 899.9990234375, "altitude": 0, "heading": 0, "latitude": 20.9832312, "longitude": 105.8328826, "speed": 0} */}
      {/* <Text onPress={navigateToChooseAddress}>nav address</Text> */}
      {detailCompany &&
        detailCompany?.config &&
        detailCompany?.config?.companyId && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}
            contentContainerStyle={styles.containerScrollView}
            refreshControl={
              <RefreshControl
                onRefresh={onRefresh}
                refreshing={state.refreshing}
              />
            }>
            <View>
              {state.isEditing && (
                <TextView
                  id="ipAddress"
                  title="(Sử dụng mạng hiện tại)"
                  style={{
                    justifyContent: 'flex-end',
                    marginTop: 10,
                  }}
                  styleTitle={{
                    color: commons.colorMain,
                    fontSize: commons.fontSize12,
                  }}
                  onPress={onPressUseDefault}
                />
              )}
              <TextInputController
                {...{
                  name: 'ipAddress',
                  placeholder: 'Địa chỉ IP',
                  defaultValue: config?.ipAddress.toString(),
                  editable: state.isEditing,
                  errors,
                  control,
                }}
              />
              {state.isEditing && (
                <TextView
                  id="location"
                  title="(Sử dụng vị trí hiện tại)"
                  style={{
                    justifyContent: 'flex-end',
                    marginTop: 10,
                  }}
                  styleTitle={{
                    color: commons.colorMain,
                    fontSize: commons.fontSize12,
                  }}
                  onPress={onPressUseDefault}
                />
              )}
              <TextInputController
                {...{
                  name: 'lat',
                  placeholder: 'Latitude',
                  defaultValue: config?.lat.toString(),
                  editable: state.isEditing,
                  errors,
                  control,
                }}
              />
              <TextInputController
                {...{
                  name: 'long',
                  placeholder: 'Longitude',
                  defaultValue: config?.long.toString(),
                  editable: state.isEditing,
                  errors,
                  control,
                }}
              />
              <TextInputController
                {...{
                  name: 'maxMinutesComeLate',
                  placeholder: 'Số phút đi muộn tối đa',
                  defaultValue: config?.maxMinutesComeLate.toString(),
                  editable: state.isEditing,
                  keyboardType: 'numeric',
                  errors,
                  control,
                }}
              />
              <TextInputController
                {...{
                  name: 'maxMinutesLeaveEarly',
                  placeholder: 'Số phút về sớm tối đa',
                  defaultValue: config?.maxMinutesLeaveEarly.toString(),
                  editable: state.isEditing,
                  keyboardType: 'numeric',
                  errors,
                  control,
                }}
              />

              {/* <TextPressController
              {...{
                name: 'checkin',
                placeholder: 'Giờ Checkin',
                defaultValue: config?.checkin.toString(),
                errors,
                control,
              }}
            /> */}
              <RowTextView
                {...{
                  title: 'Giờ Checkin',
                  id: 'checkin',
                  value:
                    currentPicker && form['checkin']
                      ? moment(form['checkin']).format(commons.FORMAT_TIME_DIFF)
                      : config?.checkin,
                }}
              />
              <RowTextView
                {...{
                  title: 'Giờ Checkout',
                  id: 'checkout',
                  value:
                    currentPicker && form['checkout']
                      ? moment(form['checkout']).format(
                          commons.FORMAT_TIME_DIFF,
                        )
                      : config?.checkout,
                }}
              />
              <RowTextView
                {...{
                  title: 'Checkin hợp lệ',
                  id: 'allowCheckin',
                  value:
                    currentPicker && form['allowCheckin']
                      ? moment(form['allowCheckin']).format(
                          commons.FORMAT_TIME_DIFF,
                        )
                      : config?.allowCheckin,
                }}
              />
              <RowTextView
                {...{
                  title: 'Checkout hợp lệ',
                  id: 'allowCheckout',
                  value:
                    currentPicker && form['allowCheckout']
                      ? moment(form['allowCheckout']).format(
                          commons.FORMAT_TIME_DIFF,
                        )
                      : config?.allowCheckout,
                }}
              />
              <View style={{height: 15}} />

              {/* <TextView
              id="Submit"
              onPress={handleSubmit(onSubmit)}
              style={{
                height: commons.heightButtonDefault,
                width: '100%',
                backgroundColor: commons.colorMain,
                ...styles.center,
              }}
              styleText={{color: 'white'}}>
              Submit
            </TextView> */}
            </View>
          </ScrollView>
        )}
      {state.isEditing && (
        <TextView
          id="Submit"
          onPress={handleSubmit(onSubmit)}
          style={styles.containerBottomButton}
          styleText={styles.textBottomButton}>
          Cập nhật
        </TextView>

        /* <View style={{bottom: 0, left: 0, right: 0, position: 'absolute'}}>
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View> */
      )}
    </>
  );
};

export default SetupCompany;
