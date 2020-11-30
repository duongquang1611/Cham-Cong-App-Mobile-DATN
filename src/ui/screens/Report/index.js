import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import API from '../../../networking';
import commons from '../../commons';
import {HeaderMenuDrawer} from '../../components';
import AskComeLeaveCompany from './AskComeLeaveCompany';
import AskDayOffCompany from './AskDayOffCompany';
import WorkDayCompany from './WorkDayCompany';
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

  return (
    <>
      <HeaderMenuDrawer titleScreen={'Tổng hợp chấm công'} />

      <Tab.Navigator
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
      </Tab.Navigator>
    </>
  );
};

export default Report;
