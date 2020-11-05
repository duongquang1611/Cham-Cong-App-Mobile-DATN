import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Picker} from '@react-native-community/picker';

import models from '../../../models';
import actions from '../../../redux/actions';
import {HeaderMenuDrawer, showAlert, TextView} from 'cc-components';
import styles from './styles';
import SubTimeCheckin from './SubTimeCheckin';
import {GET} from '../../../networking';
import urlAPI from '../../../networking/urlAPI';
import commons from '../../commons';

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
  });
  const setParamsAlert = () => {
    showAlert({
      showCancel: false,
    });
  };

  useEffect(() => {
    if (userInfo?.companyId?._id) {
      console.log('HomeScreen -> companyId._id', userInfo.companyId._id);
      getUserCompany(userInfo?.companyId?._id);
    }
  }, [userInfo?._id]);
  useEffect(() => {
    console.log(state.selectedUser.name);
  }, [state]);
  const logout = () => {
    dispatch(actions.requestLogout());
  };
  const getUserCompany = async (id) => {
    try {
      let users = await GET(urlAPI.searchUsers, {companyId: id});
      setState({
        ...state,
        userCompany: users,
      });
    } catch (error) {
      console.log('HomeScreen -> error', error);
    }
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
          Tình trạng: <Text style={{fontWeight: 'bold'}}>Đã Check in</Text>
        </Text>
        <View style={styles.viewBottomBlock} />
      </View>
    );
  };

  const TimeCheckin = (props) => {
    return (
      <View style={{...styles.rowCenterSpaceBetween}}>
        <SubTimeCheckin type="checkin" />
        <SubTimeCheckin type="checkout" />
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
            state.userCompany.find(
              (item) => item._id === state.selectedUser._id,
            ) || state.userCompany[0]
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
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Chấm công'} />
      <ScrollView
        style={styles.containerScrollView}
        showsVerticalScrollIndicator={false}>
        <SelectUserCheckin />
        <View style={styles.viewBottomBlock} />
        <Text>calendar</Text>
        <View style={styles.viewBottomBlock} />
        <SyntheticInfo />
        <TimeCheckin />
      </ScrollView>
    </>
  );
};

export default HomeScreen;
