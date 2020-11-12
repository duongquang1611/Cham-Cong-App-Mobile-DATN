import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HeaderMenuDrawer} from 'cc-components';
import React from 'react';
import commons from '../../commons';
import ConfirmDayOff from './ConfirmDayOff';
import HistoryConfirmDayOff from './HistoryConfirmDayOff';

const TabConfirmDayOff = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Duyệt xin nghỉ'} />
      <Tab.Navigator
        initialRouteName={'ConfirmDayOff'}
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
          name={'ConfirmDayOff'}
          component={ConfirmDayOff}
          options={{tabBarLabel: 'Duyệt xin nghỉ'}}
          // initialParams={{demandCode: demandCode[0]}}
        />
        <Tab.Screen
          name={'HistoryConfirmDayOff'}
          component={HistoryConfirmDayOff}
          // initialParams={{demandCode: demandCode[0]}}
          options={{tabBarLabel: 'Lịch sử'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabConfirmDayOff;
