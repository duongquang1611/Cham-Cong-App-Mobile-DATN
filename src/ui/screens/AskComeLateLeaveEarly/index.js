import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HeaderMenuDrawer} from 'cc-components';
import React from 'react';
import commons from '../../commons';
import AskComeLeave from './AskComeLeave';
import HistoryAskComeLeave from './HistoryAskComeLeave';

const TabAskComeLateLeaveEarly = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Đi muộn, về sớm'} />
      <Tab.Navigator
        initialRouteName={'AskComeLeave'}
        // initialRouteName={'Đánh giá'}
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
          name={'AskComeLeave'}
          component={AskComeLeave}
          options={{tabBarLabel: 'Xin đi muộn, về sớm'}}
          // initialParams={{demandCode: demandCode[0]}}
        />
        <Tab.Screen
          name={'HistoryAskComeLeave'}
          component={HistoryAskComeLeave}
          // initialParams={{demandCode: demandCode[0]}}
          options={{tabBarLabel: 'Lịch sử'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabAskComeLateLeaveEarly;
