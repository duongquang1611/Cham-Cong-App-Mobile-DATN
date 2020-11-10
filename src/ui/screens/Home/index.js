import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Modal, ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-community/picker';
import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

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
import API from '../../../networking';
import commons from '../../commons';
import moment from 'moment/min/moment-with-locales';
import ColumnBaseView from '../Report/Individual/ColumnBaseView';
import TimerIntervalView from './TimerIntervalView';
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
  let netInfo = useNetInfo();
  const authReducer = useSelector((state) => state.authReducer);
  const detailDayWork = useSelector(
    (state) => state.dayWorkReducer.detailDayWork,
  );
  const detailCompany = useSelector(
    (state) => state.companyReducer.detailCompany,
  );

  const [state, setState] = useState({
    userCompany: [userInfo],
    selectedUser: {...userInfo},
    timer: null,
    isLoading: true,
    visible: false,
    netDetails: {},
  });

  useEffect(() => {
    if (userInfo?.companyId?._id) {
      // console.log('HomeScreen -> companyId._id', userInfo.companyId._id);
      getData(userInfo?.companyId?._id);
    }
  }, [userInfo?._id]);

  useEffect(() => {
    let diff = commons.getDiffTime(detailDayWork?.checkin);

    const interval = setInterval(() => {
      if (detailDayWork?.checkin && !detailDayWork?.checkout) {
        setState({
          ...state,
          timer: diff,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [detailDayWork, state.timer]);

  const logout = () => {
    dispatch(actions.requestLogout());
  };
  const getData = async (companyId) => {
    try {
      let data = await Promise.all([
        API.GET(API.searchUsers, {companyId: companyId}),
        API.getDetailCompany(companyId, dispatch),
        API.getDetailDayWork(dispatch),
      ]);
      if (data[0]) {
        setState({
          ...state,
          userCompany: data[0],
          isLoading: false,
        });
      }
    } catch (error) {
      setState({
        ...state,
        isLoading: false,
      });
      console.log('HomeScreen -> error', error);
    }
  };

  const getStatusCheckTime = () => {
    let checkout = detailDayWork?.checkout;
    let checkin = detailDayWork?.checkin;
    // 0: Chưa checkin
    // 1: Đã checkin
    // 2: Đã checkout
    // 3: Quá hạn cham cong

    let status = 0;
    if (checkin) {
      if (checkout) status = 2;
      else status = 1;
    } else status = 0;
    return status;
  };

  const getTextStatus = () => {
    let msg = 'Chưa Checkin';
    let msgButton = 'Checkin';
    // 0: Chưa checkin
    // 1: Đã checkin
    // 2: Đã checkout
    // 3: Quá hạn chấm công

    switch (getStatusCheckTime()) {
      case 0:
        break;
      case 1:
        msg = 'Đã Checkin';
        msgButton = 'Checkout';
        break;
      case 2:
        msg = 'Đã Checkout';
        msgButton = msg;
        break;
      case 3:
        msg = 'Quá hạn chấm công';
        msgButton = msg;
        break;
      default:
        break;
    }
    return {msg, msgButton};
  };
  const isDisableButtonCheckTime = () => {
    let status = getStatusCheckTime();
    return status === 2 || status === 3;
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
          <Text style={{fontWeight: 'bold'}}>{getTextStatus().msg}</Text>
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
            detailDayWork?.checkin
              ? moment(detailDayWork?.checkin).format(commons.FORMAT_TIME_DIFF)
              : DEFAULT_TIME
          }
          subTime={commons.convertSecondToHHmmss(
            detailDayWork?.minutesComeLate * 60 || 0,
          )}
        />
        <SubTimeCheckin
          type="checkout"
          time={
            detailDayWork?.checkout
              ? moment(detailDayWork?.checkout).format(commons.FORMAT_TIME_DIFF)
              : DEFAULT_TIME
          }
          subTime={commons.convertSecondToHHmmss(
            detailDayWork?.minutesLeaveEarly * 60 || 0,
          )}
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
            state?.userCompany?.length > 0
              ? state?.userCompany.find(
                  (item) => item._id === state?.selectedUser._id,
                )
              : state?.userCompany[0]
          }
          style={{minWidth: 250}}
          onValueChange={(itemValue, itemIndex) => {
            setState({...state, selectedUser: itemValue});
          }}>
          {state?.userCompany?.length > 0 &&
            state?.userCompany.map((item, index) => (
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
            msg={detailCompany?.config?.allowCheckin || DEFAULT_TIME}
            colorMsg={commons.colorMain}
          />
          <ColumnBaseView
            title="Checkout"
            msg={detailCompany?.config?.allowCheckout || DEFAULT_TIME}
            colorMsg="red"
            end={true}
          />
        </View>
      </View>
    );
  };
  const onPressCheckTime = () => {
    console.log(detailCompany?.config?.ipAddress, netInfo?.details?.ipAddress);
    // if (!detailDayWork?.checkin) {
    //   API.createOrUpdateDayWork(dispatch);
    //   // setState({...state, visible: true});
    //   // chua checkin
    // } else {
    //   // da checkin, press checkout -> disable button
    //   API.createOrUpdateDayWork(dispatch, {isCheckout: true});
    // }
  };
  const closeModal = () => {
    console.log('abc');
    setState({...state, visible: false});
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Chấm công'} />
      {state.isLoading && <LoadingView />}
      <Modal
        transparent={true}
        visible={state.visible}
        onRequestClose={closeModal}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'blue',
            }}></View>
        </View>
      </Modal>
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
              Tổng thời gian làm: <TimerIntervalView {...{detailDayWork}} />
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
                detailDayWork?.checkin && detailDayWork?.checkout
                  ? null
                  : onPressCheckTime
              }
              styleDisable={{
                backgroundColor: 'gray',
                ...styles.buttonCheckTime,
              }}
              disabled={isDisableButtonCheckTime()}>
              {getTextStatus().msgButton}
            </TextView>
          </View>
        </View>
        <CheckinView />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
