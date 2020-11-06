import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-community/picker';

import models from '../../../models';
import actions from '../../../redux/actions';
import {
  HeaderMenuDrawer,
  LoadingView,
  showAlert,
  TextView,
} from 'cc-components';
import styles from './styles';
import SubTimeCheckin from './SubTimeCheckin';
import {GET} from '../../../networking';
import urlAPI from '../../../networking/urlAPI';
import commons from '../../commons';
import moment from 'moment/min/moment-with-locales';
import ColumnBaseView from '../Report/Individual/ColumnBaseView';
moment.locale(commons.getDeviceLanguage(false));
const DEFAULT_TIME = '--h : --p : --s';
const HomeScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );
  let userInfo = models.getUserInfo();
  const authReducer = useSelector((state) => state.authReducer);

  const [state, setState] = useState({
    userCompany: [userInfo],
    selectedUser: {...userInfo},
    detailCompany: {},
    checkinTime: null,
    checkoutTime: null,
    timer: null,
    isLoading: true,
  });
  const setParamsAlert = () => {
    showAlert({
      showCancel: false,
    });
  };

  useEffect(() => {
    if (userInfo?.companyId?._id) {
      console.log('HomeScreen -> companyId._id', userInfo.companyId._id);
      getData(userInfo?.companyId?._id);
    }
  }, [userInfo?._id]);

  useEffect(() => {
    let diff = moment
      .utc(
        moment(new Date(), 'HH:mm:ss').diff(
          // moment(new Date(state.checkinTime), 'HH:mm:ss'),
          state.checkinTime,
        ),
      )
      .format('HH:mm:ss');
    console.log('HomeScreen -> diff', diff, state.checkinTime);
    const interval = setInterval(() => {
      if (state.checkinTime && !state.checkoutTime) {
        setState({
          ...state,
          timer: diff,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  const logout = () => {
    dispatch(actions.requestLogout());
  };
  const getData = async (id) => {
    try {
      let data = await Promise.all([
        GET(urlAPI.searchUsers, {companyId: id}),
        GET(urlAPI.detailCompany(id)),
      ]);
      setState({
        ...state,
        userCompany: data[0],
        detailCompany: data[1],
        isLoading: false,
      });
    } catch (error) {
      console.log('HomeScreen -> error', error);
    }
  };

  const getTextStatus = () => {
    let msg = 'Chưa Checkin';
    if (state.checkoutTime) {
      msg = 'Đã Checkout';
    } else if (state.checkinTime) {
      msg = 'Đã Checkin';
    }

    return msg;
  };
  const SyntheticInfo = (props) => {
    return (
      <View style={{...styles.center}}>
        <TextView
          nameIconLeft="address-location"
          colorIconLeft={'red'}
          styleText={{color: 'red', ...styles.lineHeightText}}>
          {'Địa điểm không hợp lệ'}
        </TextView>
        <Text style={{...styles.lineHeightText}}>
          Tổng số phút đi muộn trong tháng:{' '}
          <Text style={{fontWeight: 'bold'}}>0 ph</Text>
        </Text>
        <Text style={{...styles.lineHeightText}}>
          Tình trạng:{' '}
          <Text style={{fontWeight: 'bold'}}>{getTextStatus()}</Text>
        </Text>
        <View style={styles.viewBottomBlock} />
      </View>
    );
  };

  const TimeCheckin = (props) => {
    return (
      <View style={{...styles.rowCenterSpaceBetween}}>
        <SubTimeCheckin
          type="checkin"
          time={
            state.checkinTime
              ? moment(state.checkinTime).format('HH : mm : ss')
              : DEFAULT_TIME
          }
        />
        <SubTimeCheckin
          type="checkout"
          time={
            state.checkoutTime
              ? moment(state.checkoutTime).format('HH : mm : ss')
              : DEFAULT_TIME
          }
        />
      </View>
    );
  };
  const SelectUserCheckin = () => {
    return (
      <View style={{...styles.rowCenterSpaceBetween}}>
        <Text style={{fontSize: commons.fontSize16}}>Chấm công</Text>
        {/* <TextView value={state.selectedUser?.name}></TextView> */}
        <Picker
          mode="dropdown"
          enabled={
            userInfo?.roleId?.code !== 'staff' &&
            userInfo?.roleId?.code !== 'manager'
          }
          selectedValue={
            state.userCompany.length > 0
              ? state?.userCompany.find(
                  (item) => item._id === state.selectedUser._id,
                )
              : state.userCompany[0]
          }
          style={{minWidth: 250}}
          onValueChange={(itemValue, itemIndex) => {
            setState({...state, selectedUser: itemValue});
          }}>
          {state.userCompany.map((item, index) => (
            <Picker.Item label={item.name} value={item} key={index} />
          ))}
        </Picker>
      </View>
    );
  };
  const CheckinView = (props) => {
    return (
      <View>
        <Text style={styles.title}>Thời gian cho phép chấm công</Text>
        <View style={styles.containerTimeAllow}>
          <ColumnBaseView
            title={'Checkin'}
            msg={state?.detailCompany?.config?.allowCheckin || DEFAULT_TIME}
            colorMsg={commons.colorMain}
          />
          <ColumnBaseView
            title="Checkout"
            msg={state?.detailCompany?.config?.allowCheckout || DEFAULT_TIME}
            colorMsg="red"
            end={true}
          />
        </View>
      </View>
    );
  };
  const onPressCheckTime = () => {
    if (!state?.checkinTime) {
      setState({...state, checkinTime: moment()});
    } else {
      setState({...state, checkoutTime: moment()});
    }
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Chấm công'} />
      {state.isLoading && <LoadingView />}
      <ScrollView
        style={{...styles.containerScrollView}}
        contentContainerStyle={{justifyContent: 'space-between', flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View>
          <SelectUserCheckin />
          <View style={styles.viewBottomBlock} />
          <Text>calendar</Text>
          <View style={styles.viewBottomBlock} />
          <SyntheticInfo />
          <TimeCheckin />
          <View style={styles.viewBottomBlock} />
          <View style={{}}>
            <Text style={styles.title}>
              Ngày: {moment().format('DD-MM-YYYY')}
            </Text>
            <Text style={styles.title}>
              Tổng thời gian làm: {state.timer || DEFAULT_TIME}
            </Text>
            <TextView
              style={{
                backgroundColor: commons.colorMain,
                ...styles.buttonCheckTime,
              }}
              styleText={{
                color: 'white',
                fontSize: commons.fontSize16,
                fontWeight: 'bold',
              }}
              styleTextDisabled={{
                color: 'white',
                fontSize: commons.fontSize16,
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              onPress={
                state?.checkinTime && state?.checkoutTime
                  ? null
                  : onPressCheckTime
              }
              styleDisable={{
                backgroundColor: 'gray',
                ...styles.buttonCheckTime,
              }}
              disabled={
                state?.checkinTime && state?.checkoutTime ? true : false
              }>
              {state?.checkinTime && state?.checkoutTime
                ? 'Không phải thời điểm chấm công'
                : state?.checkinTime
                ? 'Checkout'
                : 'Checkin'}
            </TextView>
          </View>
        </View>
        <CheckinView />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
