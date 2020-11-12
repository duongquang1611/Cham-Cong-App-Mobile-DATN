import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HeaderMenuDrawer} from 'cc-components';
import React from 'react';
import commons from '../../commons';
import ConfirmComeLeave from './ConfirmComeLeave';
import HistoryConfirmComeLeave from './HistoryConfirmComeLeave';

const TabConfirmComeLateLeaveEarly = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Duyệt đi muộn, về sớm'} />
      <Tab.Navigator
        initialRouteName={'ConfirmComeLeave'}
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
          name={'ConfirmComeLeave'}
          component={ConfirmComeLeave}
          options={{tabBarLabel: 'Duyệt đi muộn, về sớm'}}
          // initialParams={{demandCode: demandCode[0]}}
        />
        <Tab.Screen
          name={'HistoryConfirmComeLeave'}
          component={HistoryConfirmComeLeave}
          // initialParams={{demandCode: demandCode[0]}}
          options={{tabBarLabel: 'Lịch sử'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabConfirmComeLateLeaveEarly;
