import {useNavigation} from '@react-navigation/native';
import {HeaderMenuDrawer, TextView} from 'cc-components';
import React, {useEffect, useState} from 'react';
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
let form = {};
const SetupCompany = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const navigateToChooseAddress = () => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'ChooseAddress');
  };

  const detailCompany = useSelector(
    (state) => state.companyReducer.detailCompany,
  );
  const {control, handleSubmit, errors, register} = useForm();
  // console.log('SetupCompany -> detailCompany', detailCompany);
  const {config = {}} = detailCompany;
  let user = models.getUserInfo();

  const [state, setState] = useState({
    refreshing: true,
    isEditing: false,
  });
  useEffect(() => {
    state.refreshing && getData();
    return () => {};
  }, [state.refreshing]);

  useEffect(() => {}, [register]);

  const onSubmit = (data) => console.log(data);

  const getData = async () => {
    setState({...state, refreshing: false});
    if (user && user?.companyId && user?.companyId?._id) {
      API.getDetailCompany(user?.companyId?._id, dispatch);
    }
  };
  const onRefresh = () => {
    setState({...state, refreshing: true});
  };
  const onPressEdit = () => {};

  const RowTextView = (props) => {
    const {title = '', onPress, id = '', value = ''} = props;
    return (
      <View style={styles.containerRow}>
        <Text style={{flex: 1, fontSize: 16}}>{title}</Text>
        <TextView
          id={id}
          onPress={onPress}
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
  return (
    <>
      <HeaderMenuDrawer
        titleScreen="Cấu hình công ty"
        nameMenuRight={state.isEditing ? 'content-save' : 'account-edit'}
        typeMenuRight="MaterialCommunityIcons"
        onPressMenuRight={onPressEdit}
        colorMenuRight="white"
        sizeMenuRight={commons.sizeIcon28}
        styleMenuRight={{marginRight: 5}}
      />
      {/* {"accuracy": 899.9990234375, "altitude": 0, "heading": 0, "latitude": 20.9832312, "longitude": 105.8328826, "speed": 0} */}
      {/* <Text onPress={navigateToChooseAddress}>nav address</Text> */}
      {detailCompany && detailCompany?.config && (
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

            <RowTextView
              {...{
                title: 'Giờ Checkin',
                id: 'checkin',
                value: config?.checkin,
                onPress: null,
              }}
            />
            <RowTextView
              {...{
                title: 'Giờ Checkout',
                id: 'checkout',
                value: config?.checkout,
                onPress: null,
              }}
            />
            <RowTextView
              {...{
                title: 'Checkin hợp lệ',
                id: 'allowCheckin',
                value: config?.allowCheckin,
                onPress: null,
              }}
            />
            <RowTextView
              {...{
                title: 'Checkout hợp lệ',
                id: 'allowCheckout',
                value: config?.allowCheckout,
                onPress: null,
              }}
            />
            <View style={{height: 15}} />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
