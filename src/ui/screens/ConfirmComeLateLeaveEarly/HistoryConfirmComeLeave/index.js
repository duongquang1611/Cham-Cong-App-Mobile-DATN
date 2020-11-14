import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../../models';
import API from '../../../../networking';
import commons from '../../../commons';
import HistoryConfirmComeLate from './HistoryConfirmComeLate';
import HistoryConfirmLeaveEarly from './HistoryConfirmLeaveEarly';

const TabHistoryConfirmComeLeave = () => {
  const Tab = createMaterialTopTabNavigator();
  // const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();
  let userInfo = models.getUserInfo();
  let filterConfirmComeLeave = {
    userId: userInfo?._id,
    comeLeave: true,
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // API.getListConfirmComeLeave(dispatch, filterConfirmComeLeave);
  };

  return (
    <Tab.Navigator
      // initialRouteName={'ConfirmComeLeave'}
      swipeEnabled={false}
      tabBarPosition="bottom"
      initialRouteName={'HistoryConfirmComeLate'}
      backBehavior="none"
      style={{backgroundColor: 'white'}}
      sceneContainerStyle={{backgroundColor: 'white'}}
      initialLayout={{width: Dimensions.get('window').width}}
      tabBarOptions={{
        labelStyle: {
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: commons.fontSize14,
        },
      }}>
      <Tab.Screen
        name={'HistoryConfirmComeLate'}
        component={HistoryConfirmComeLate}
        initialParams={{type: 'comeLateConfirm'}}
        // component={<Text>Đi muộn</Text>}
        options={{tabBarLabel: 'Đi muộn'}}
      />

      <Tab.Screen
        name={'HistoryConfirmLeaveEarly'}
        component={HistoryConfirmLeaveEarly}
        // component={<Text>Về sớm</Text>}
        initialParams={{type: 'leaveEarly'}}
        options={{tabBarLabel: 'Về sớm'}}
      />
    </Tab.Navigator>
  );
};

export default TabHistoryConfirmComeLeave;

const styles = StyleSheet.create({});
