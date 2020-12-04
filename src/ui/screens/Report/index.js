import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import API from '../../../networking';
import commons from '../../commons';
import {HeaderMenuDrawer} from '../../components';
import AskComeLeaveCompany from './AskComeLeaveCompany';
import AskDayOffCompany from './AskDayOffCompany';
import WorkDayCompany from './WorkDayCompany';
import MonthPicker from 'react-native-month-year-picker';

import styles from './styles';
let filterMonthYear = commons.getDayMonthYear(undefined, false);
let filterComeLeave = {comeLeave: true};
const Report = () => {
  const Tab = createMaterialTopTabNavigator();
  let user = models.getUserInfo();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const detailDayWork = useSelector(
    (state) => state.dayWorkReducer.detailDayWork,
  );
  const reportReducer = useSelector((state) => state.reportReducer);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const getData = async () => {
    await Promise.all([
      API.getListUsersInCompany(dispatch),
      API.getListDayWorkCompany(dispatch, filterMonthYear),
      API.getListAskComeLeaveInCompany(dispatch, filterComeLeave),
      API.getListAskDayOffInCompany(dispatch),
    ]);
  };

  useEffect(() => {
    getData();
  }, [detailDayWork]);
  const togglePicker = useCallback((value) => setShowPicker(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      togglePicker(false);
      setDate(selectedDate);
      console.log({selectedDate});
    },
    [date, showPicker],
  );
  return (
    <>
      <HeaderMenuDrawer
        titleScreen={`Chấm công tháng ${
          date.getMonth() + 1
        } - ${date.getFullYear()}`}
        nameMenuRight={'calendar'}
        colorMenuRight={'white'}
        sizeMenuRight={commons.sizeIcon20}
        onPressMenuRight={() => togglePicker(true)}
      />
      {showPicker && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          minimumDate={new Date(1980, 1)}
          maximumDate={new Date(2050, 12)}
          locale="vi"
          okButton="Đồng ý"
          cancelButton="Hủy"
        />
      )}
      <WorkDayCompany />

      {/* <Tab.Navigator
        tabBarPosition="top"
        initialRouteName={'Account'}
        backBehavior="none"
        style={{backgroundColor: 'white'}}
        sceneContainerStyle={{backgroundColor: 'white'}}
        tabBarOptions={{
          labelStyle: {
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: commons.fontSize14,
          },
        }}
        swipeEnabled={true}
        initialLayout={{width: Dimensions.get('window').width}}>
        <Tab.Screen
          name={'WorkDayCompany'}
          component={WorkDayCompany}
          options={{tabBarLabel: 'Chấm công'}}
          // initialParams={{demandCode: '111'}}
          // listeners={({navigation}) => ({
          //   focus: (e) => {
          //     currentTabFocus = TypeTabManagement.account;
          //   },
          // })}
        />
        <Tab.Screen
          name={'AskComeLeaveCompany'}
          component={AskComeLeaveCompany}
          // initialParams={{demandCode: demandCode[0]}}
          options={{tabBarLabel: 'Muộn, Sớm'}}
          // listeners={({navigation}) => ({
          //   focus: (e) => {
          //     currentTabFocus = TypeTabManagement.company;
          //   },
          // })}
        />
        <Tab.Screen
          name={'AskDayOffCompany'}
          component={AskDayOffCompany}
          // initialParams={{demandCode: demandCode[0]}}
          options={{tabBarLabel: 'Xin nghỉ'}}
          // listeners={({navigation}) => ({
          //   focus: (e) => {
          //     currentTabFocus = TypeTabManagement.company;
          //   },
          // })}
        />
      </Tab.Navigator> */}
    </>
  );
};

export default Report;
