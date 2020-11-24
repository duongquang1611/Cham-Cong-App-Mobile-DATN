import {useNavigation} from '@react-navigation/native';
import {HeaderMenuDrawer, LoadingView, TextView} from 'cc-components';
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

  const detailCompany = useSelector(
    (state) => state.companyReducer.detailCompany,
  );
  // const {control, handleSubmit, errors, register, setValue} = useForm();
  const {control, handleSubmit, errors, register} = useForm();
  // console.log('SetupCompany -> detailCompany', detailCompany);
  const {config = {}} = detailCompany;
  let user = models.getUserInfo();

  const [state, setState] = useState({
    refreshing: true,
    isEditing: false,
    isDatePickerVisible: false,
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

  const onSubmit = (data) => {
    let formatForm = {};
    Object.entries(form).map(([key, value]) => {
      formatForm[key] = moment(value).format(commons.FORMAT_TIME_DIFF);
    });
    let updateData = {...data, ...formatForm, companyId: user?.companyId?._id};
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

  // const handleTimeConfirm = useCallback((date) => {
  //   console.log('handleConfirm -> date', date);
  //   hideTimePicker();
  // }, []);

  const showDatePicker = ({id}) => {
    // changeValueSelected = onChange;
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

  // const onSelected = ({id, data}) => {
  //   console.log('onSelected ~ id, data', id, data);
  //   // data && setValue(id, data);
  // };
  const RowTextView = (props) => {
    const {title = '', onPress, id = '', value = ''} = props;
    return (
      <View style={styles.containerRow}>
        <Text style={{flex: 1, fontSize: 16}}>{title}</Text>
        <TextView
          id={id}
          onPress={showDatePicker}
          style={{flex: 2, ...styles.input}}
          value={value}
          styleValue={{
            color: 'black',
            marginVertical: 15,
          }}
        />
      </View>
    );
  };
  const TextPressController = (props) => {
    const {
      name,
      placeholder = '',
      defaultValue = '',
      errors,
      control,
      keyboardType = 'default',
    } = props;
    let rules = {required: true};
    if (keyboardType === 'numeric') rules.min = 0;

    return (
      <View style={styles.containerRow}>
        <Text style={{flex: 1, fontSize: 16}}>{placeholder}</Text>
        <View style={{flex: 2}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextView
                // onPress={() => onChange('xxx')}
                onPress={() => showDatePicker({id, onChange: onChange})}
                data={value}
                id={name}
                style={{...styles.input}}
                centerElement={
                  <TextInput
                    style={{color: 'black'}}
                    onBlur={onBlur}
                    pointerEvents="none"
                    onChangeText={(value) => onChange(value)}
                    editable={false}
                    value={value}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                  />
                }></TextView>
            )}
            name={name}
            defaultValue={defaultValue}
            rules={rules}
          />
          {errors[name] && <TextRequired type={errors[name].type} />}
        </View>
      </View>
    );
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
              <TextInputController
                {...{
                  name: 'ipAddress',
                  placeholder: 'Địa chỉ IP',
                  defaultValue: config?.ipAddress.toString(),
                  errors,
                  control,
                }}
              />
              <TextInputController
                {...{
                  name: 'lat',
                  placeholder: 'Latitude',
                  defaultValue: config?.lat.toString(),
                  errors,
                  control,
                }}
              />
              <TextInputController
                {...{
                  name: 'long',
                  placeholder: 'Longitude',
                  defaultValue: config?.long.toString(),
                  errors,
                  control,
                }}
              />
              <TextInputController
                {...{
                  name: 'maxMinutesComeLate',
                  placeholder: 'Số phút đi muộn tối đa',
                  defaultValue: config?.maxMinutesComeLate.toString(),
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
                  // onPress: onSelected,
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
                  // onPress: onSelected,
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
                  // onPress: onSelected,
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
                  // onPress: onSelected,
                }}
              />
              <View style={{height: 15}} />
              {state.isEditing && (
                <Button title="Submit" onPress={handleSubmit(onSubmit)} />
              )}
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
    </>
  );
};

export default SetupCompany;
