import {useNavigation} from '@react-navigation/native';
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Modal,
  PermissionsAndroid,
  ScrollView,
  Text,
  View,
} from 'react-native';
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
  CustomBottomSheet,
} from 'cc-components';
import styles from './styles';
import SubTimeCheckin from './SubTimeCheckin';
import API from '../../../networking';
import commons from '../../commons';
import moment from 'moment/min/moment-with-locales';
import ColumnBaseView from '../Report/Individual/ColumnBaseView';
import TimerIntervalView from './TimerIntervalView';
import {getLocation} from '../../commons/location';
import ImageCropPicker from 'react-native-image-crop-picker';
import msgWarning from './msgWarning';
moment.locale(commons.getDeviceLanguage(false));

const DEFAULT_TIME = '--h : --m : --s';
let locationData = {};

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );
  let userInfo = models.getUserInfo();
  // let netInfo = useNetInfo();
  const authReducer = useSelector((state) => state.authReducer);
  const detailDayWork = useSelector(
    (state) => state.dayWorkReducer.detailDayWork,
  );
  const detailCompany = useSelector(
    (state) => state.companyReducer.detailCompany,
  );
  let allowCheckin = commons.setTimeToDate(detailCompany?.config?.allowCheckin);
  let allowCheckout = commons.setTimeToDate(
    detailCompany?.config?.allowCheckout,
  );
  let defaultCheckin = commons.setTimeToDate(detailCompany?.config?.checkin);
  let defaultCheckout = commons.setTimeToDate(detailCompany?.config?.checkout);

  const [state, setState] = useState({
    userCompany: [userInfo],
    selectedUser: {...userInfo},
    // timer: null,
    isLoading: true,
    visibleModal: false,
    netDetails: {},
    percentHeight: 0,
    isGrantedLocation: false,
    isCheckFace: false,
  });
  const refBottomSheet = useRef();

  // useEffect(() => {
  //   if (userInfo?.companyId?._id) {
  //     // console.log('HomeScreen -> companyId._id', userInfo.companyId._id);
  //     getData(userInfo?.companyId?._id);
  //   }
  // }, [userInfo?._id]);

  useEffect(() => {
    if (state.selectedUser?.companyId?._id) {
      // console.log('HomeScreen -> companyId._id', state.selectedUser.companyId._id);
      getData(state.selectedUser?.companyId?._id);
    }
  }, [state.selectedUser?._id]);

  // useEffect(() => {
  //   let diff = commons.getDiffTime(detailDayWork?.checkin);

  //   const interval = setInterval(() => {
  //     if (detailDayWork?.checkin && !detailDayWork?.checkout) {
  //       setState({
  //         ...state,
  //         timer: diff,
  //       });
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [detailDayWork, state.timer]);

  const logout = () => {
    dispatch(actions.requestLogout());
  };

  const requestLocationPermission = async (cb) => {
    console.log('request location');
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
          isGrantedLocation: true,
        });
        if (cb) {
          cb();
        }
      } else {
        showAlert({msg: 'Permission Denied.'});
      }
    } catch (err) {
      console.log('ChooseAddress -> err', err);
      showAlert({msg: err.message});
    }
  };

  useEffect(() => {
    // get permission location
    !state.isGrantedLocation && requestLocationPermission();
  }, [state.isGrantedLocation]);

  const setParamsDayWork = () => {
    return {
      dayWork: moment().format(commons.FORMAT_DATE),
      userId: state.selectedUser?._id,
    };
  };
  const getData = async (companyId) => {
    try {
      let data = await Promise.all([
        API.GET(API.searchUsers, {companyId: companyId}),
        API.getDetailCompany(companyId, dispatch),
        API.getDetailDayWork(dispatch, setParamsDayWork()),
      ]);
      if (data[0]) {
        setState({
          ...state,
          userCompany: data[0],
          isLoading: false,
        });
      } else {
        setState({
          ...state,
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
          colorIconLeft={state.isGrantedLocation ? 'green' : 'red'}
          styleText={{
            color: state.isGrantedLocation ? 'black' : 'red',
            ...styles.lineHeightText,
          }}>
          {state.isGrantedLocation
            ? 'Đã cấp quyền truy cập vị trí'
            : 'Chưa cấp quyền truy cập vị trí'}
        </TextView>
        {/* <TextView
          nameIconLeft={
            isValidIpToCheckin() ? 'checkbox-marked-circle' : 'close-circle'
          }
          sizreIconLeft={commons.sizeIcon28}
          typeIconLeft="MaterialCommunityIcons"
          colorIconLeft={isValidIpToCheckin() ? 'green' : 'red'}
          nameIconRight="info-alt"
          colorIconRight={commons.colorMain70}
          onPressIconRight={onPressShowMoreInfoIp}
          styleText={{
            color: isValidIpToCheckin() ? 'black' : 'red',
            ...styles.lineHeightText,
          }}>
          {`Địa chỉ IP ${isValidIpToCheckin() ? '' : 'không '}hợp lệ`}
        </TextView> */}
        {/* <Text style={{...styles.lineHeightText}}>
          Tổng số phút đi muộn trong tháng:{' '}
          <Text style={{fontWeight: 'bold'}}>0 ph</Text>
        </Text> */}
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
      <View style={{paddingHorizontal: 10}}>
        <Text style={{}}>Giờ làm việc</Text>
        <View style={styles.containerTimeAllow}>
          <ColumnBaseView
            title={'Checkin'}
            showTitle={false}
            msg={detailCompany?.config?.checkin || DEFAULT_TIME}
            colorMsg={commons.colorMain}
          />
          <ColumnBaseView
            title="Checkout"
            showTitle={false}
            msg={detailCompany?.config?.checkout || DEFAULT_TIME}
            colorMsg="red"
            end={true}
          />
        </View>
        <Text style={{}}>Thời gian cho phép chấm công</Text>
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
  // const isValidIpToCheckin = () => {
  //   return commons.compareIpAddress(
  //     detailCompany?.config?.ipAddress,
  //     netInfo?.details?.ipAddress,
  //   );
  // };
  const onPressShowMoreInfoIp = () => {
    showAlert({
      msg: msgWarning.network,
    });
    return;
  };

  const checkinAfterCheckFaceSuccess = () => {
    console.log('checkin after face success');
    try {
      console.log('checkin', detailDayWork?.checkin);
      if (!detailDayWork?.checkin) {
        // checkin
        API.createOrUpdateDayWork(dispatch, {
          userId: state.selectedUser?._id,
          location: locationData,
        });
      } else {
        // da checkin, press checkout -> disable button
        // checkout
        API.createOrUpdateDayWork(dispatch, {
          isCheckout: true,
          userId: state.selectedUser?._id,
          location: locationData,
        });
      }
    } catch (error) {
      console.log('checkinAfterCheckFaceSuccess ~ error', error);
    }
  };

  const detectAndIdentifyImageCheckin = async (image) => {
    setState({...state, visibleModal: true});
    // console.log({userId});
    const form = new FormData();
    try {
      form.append('file', {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      });
      // upload image to add face user
      let res = await API.POST(
        API.detectAndIdentify(state.selectedUser?.companyId?._id),
        form,
      );
      console.log({res});
      if (
        res &&
        Array.isArray(res) &&
        res.length > 0 &&
        Array.isArray(res[0]?.candidates) &&
        res[0]?.candidates[0]?.personId
      ) {
        if (state.selectedUser?.personId === res[0]?.candidates[0]?.personId) {
          console.log(res[0]?.candidates[0]?.personId, 'Face is valid');
          // face valid with personId in account
          checkinAfterCheckFaceSuccess();
        } else {
          showAlert({
            msg: msgWarning.faceNotCorrect,
          });
          console.log(res[0]?.candidates[0]?.personId);
        }
        setState({...state, visibleModal: false});
      } else {
        showAlert({msg: msgWarning.faceInvalid});
        setState({...state, visibleModal: false});
      }
    } catch (error) {
      console.log('detectAndIdentifyImageCheckin ~ error', error);
      setState({...state, visibleModal: false});
    }
  };
  const openCameraCapture = () => {
    ImageCropPicker.openCamera({
      // width: commons.SCREEN_WIDTH,
      // height: commons.SCREEN_HEIGHT,
      width: 300,
      height: 400,
      cropping: false,
      maxHeight: 1200,
      maxWidth: 1200,
      compressImageQuality: 0.8,
      includeBase64: false,
    })
      .then((image) => {
        // upload face to check identify account
        detectAndIdentifyImageCheckin(image);
      })
      .catch((e) => console.log(e));
  };

  const onPressCheckTime = async () => {
    try {
      console.log({
        // ip: netInfo?.details?.ipAddress,
        isGranted: state.isGrantedLocation,
      });
      // check time to checkin
      if (!detailDayWork?.checkin) {
        // check in
        let isBeforeAllowCheckin = commons.isBeforeDate(
          new Date(),
          allowCheckin,
        );
        let isAfterAllowCheckout = commons.isBeforeDate(
          allowCheckout,
          new Date(),
        );

        if (isBeforeAllowCheckin) {
          showAlert({
            msg: `Không thể thực hiện checkin trước ${detailCompany?.config?.allowCheckin}`,
          });
          return;
        }
        if (isAfterAllowCheckout) {
          showAlert({
            msg: `Không thể thực hiện checkout sau ${detailCompany?.config?.allowCheckout}`,
          });
          return;
        }
      } else {
        // checkout
        let isBeforeAllowCheckin = commons.isBeforeDate(
          new Date(),
          allowCheckin,
        );
        let isAfterAllowCheckout = commons.isBeforeDate(
          allowCheckout,
          new Date(),
        );
        if (isBeforeAllowCheckin) {
          showAlert({
            msg: `Không thể thực hiện checkout trước ${detailCompany?.config?.allowCheckin}`,
          });
          return;
        }
        if (isAfterAllowCheckout) {
          showAlert({
            msg: `Không thể thực hiện checkout sau ${detailCompany?.config?.allowCheckout}`,
          });
          return;
        }
      }

      // check have personId to check face
      if (!state.selectedUser?.personId) {
        showAlert({
          msg: msgWarning.faceNotFound(state.selectedUser?.name),
        });
        return;
      }

      // check have ip address
      // if (!netInfo?.details?.ipAddress) {
      //   showAlert({
      //     msg: msgWarning.network,
      //   });
      //   return;
      // }

      // check grant location permission
      if (state.isGrantedLocation) {
        let location = await getLocation();
        if (location?.latitude) {
          // get location success
          locationData = location;
          console.log({locationData});

          // open camera to upload face
          openCameraCapture();
        } else {
          showAlert({msg: 'Có lỗi xảy ra. Vui lòng thử lại sau.'});
        }
      } else {
        // request location permission
        requestLocationPermission(onPressCheckTime);
      }
    } catch (error) {
      console.log({error});
    }
  };
  const closeModal = () => {
    setState({...state, visibleModal: false});
  };
  return (
    <>
      <HeaderMenuDrawer
        titleScreen={`Chấm công ${moment().format('DD/MM/YYYY')}`}
      />
      {/* {state.isLoading && <LoadingView />} */}
      <Modal
        transparent={true}
        visible={state.visibleModal}
        onRequestClose={closeModal}>
        <View style={styles.containerModal}>
          <View style={styles.containerContentModal}>
            <Text>
              {
                'Đang kiểm tra dữ liệu khuôn mặt. Vui lòng chờ trong giây lát ...\n'
              }
            </Text>
            <ActivityIndicator size="large" color={commons.colorMain} />
          </View>
        </View>
      </Modal>
      <ScrollView
        style={{...styles.containerScrollView}}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <View>
          <SelectUserCheckin />
          <View style={styles.viewBottomBlock} />
          {/* <Text>calendar</Text> */}
          {/* <View style={styles.viewBottomBlock} /> */}
          <SyntheticInfo />
          <TimeCheckin />
          <View style={styles.viewBottomBlock} />
          <View style={{}}>
            {/* <Text style={styles.title}>
              Ngày: {moment().format('DD-MM-YYYY')}
            </Text> */}

            <TextView
              style={{
                backgroundColor: commons.colorMain,
                ...styles.buttonCheckTime,
              }}
              styleText={{
                color: 'white',
                fontSize: commons.fontSize16,
                textAlign: 'center',
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
              <Text
                style={{
                  ...styles.title,
                }}>
                {'Tổng TG làm:\n'} <TimerIntervalView {...{detailDayWork}} />
                {'\n\n\n'}
                {getTextStatus().msgButton}
              </Text>
            </TextView>
          </View>
        </View>
      </ScrollView>
      <CheckinView />
      {/* <CustomBottomSheet
        {...{
          refBottomSheet,
          percentHeight: state.percentHeight,
          hideBottomSheet,
          onSelectedItem,
          titleSheet,
          dataSheet,
        }}
      /> */}
    </>
  );
};

export default memo(HomeScreen);
