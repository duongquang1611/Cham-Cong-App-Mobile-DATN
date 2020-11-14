import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HeaderMenuDrawer} from 'cc-components';
import React from 'react';
import {Dimensions} from 'react-native';
import commons from '../../commons';
import AskDayOff from './AskDayOff';
import HistoryAskDayOff from './HistoryAskDayOff';

const TabAskDayOff = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Xin nghỉ'} />
      <Tab.Navigator
        initialRouteName={'AskDayOff'}
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
        }}
        initialLayout={{width: Dimensions.get('window').width}}>
        <Tab.Screen
          name={'AskDayOff'}
          component={AskDayOff}
          options={{tabBarLabel: 'Xin nghỉ'}}
          // initialParams={{demandCode: demandCode[0]}}
        />
        <Tab.Screen
          name={'HistoryAskDayOff'}
          component={HistoryAskDayOff}
          // initialParams={{demandCode: demandCode[0]}}
          options={{tabBarLabel: 'Lịch sử'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabAskDayOff;
