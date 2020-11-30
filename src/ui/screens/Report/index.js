import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import commons from '../../commons';
import {HeaderMenuDrawer} from '../../components';
import AskCompany from './AskCompany';
import WorkDayCompany from './WorkDayCompany';

const Report = () => {
  const Tab = createMaterialTopTabNavigator();
  let user = models.getUserInfo();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const detailDayWork = useSelector(
    (state) => state.dayWorkReducer.detailDayWork,
  );

  const getData = async () => {};

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
          name={'AskCompany'}
          component={AskCompany}
          // initialParams={{demandCode: demandCode[0]}}
          options={{tabBarLabel: 'Yêu cầu'}}
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

const styles = StyleSheet.create({});
