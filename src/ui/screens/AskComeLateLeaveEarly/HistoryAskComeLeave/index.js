import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../../models';
import API from '../../../../networking';
import commons from '../../../commons';
import HistoryAskComeLate from './HistoryAskComeLate';
import HistoryAskLeaveEarly from './HistoryAskLeaveEarly';

const TabHistoryAskComeLeave = () => {
  const Tab = createMaterialTopTabNavigator();
  // const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  let userInfo = models.getUserInfo();
  let filterAskComeLeave = {
    userId: userInfo?._id,
    comeLeave: true,
  };
  const dayWorkReducer = useSelector((state) => state.dayWorkReducer);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    dayWorkReducer.changeListAskComeLeave && getData();
  }, [dayWorkReducer.changeListAskComeLeave]);

  const getData = async () => {
    API.getListAskComeLeave(dispatch, filterAskComeLeave);
  };

  return (
    <Tab.Navigator
      // initialRouteName={'AskComeLeave'}
      swipeEnabled={false}
      tabBarPosition="bottom"
      initialRouteName={'HistoryAskComeLate'}
      backBehavior="none"
      style={{backgroundColor: 'white'}}
      sceneContainerStyle={{backgroundColor: 'white'}}
      tabBarOptions={{
        labelStyle: {
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: commons.fontSize14,
        },
      }}>
      <Tab.Screen
        name={'HistoryAskComeLate'}
        component={HistoryAskComeLate}
        initialParams={{type: 'comeLateAsk'}}
        // component={<Text>Đi muộn</Text>}
        options={{tabBarLabel: 'Đi muộn'}}
      />

      {/* <Tab.Screen
        name={'HistoryAskLeaveEarly'}
        component={HistoryAskLeaveEarly}
        // component={<Text>Về sớm</Text>}
        initialParams={{type: 'leaveEarly'}}
        options={{tabBarLabel: 'Về sớm'}}
      /> */}
    </Tab.Navigator>
  );
};

export default TabHistoryAskComeLeave;

const styles = StyleSheet.create({});
