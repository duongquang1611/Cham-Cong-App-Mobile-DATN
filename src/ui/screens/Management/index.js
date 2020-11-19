import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HeaderMenuDrawer} from 'cc-components';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Dimensions} from 'react-native';
import {Portal, Provider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import API from '../../../networking';
import commons from '../../commons';
import AccountManagement from './Account';
import ButtonPlusFAB from './ButtonPlusFAB';
import CompanyManagement from './Company';

const TabManagement = () => {
  const Tab = createMaterialTopTabNavigator();
  let userInfo = models.getUserInfo();

  const dispatch = useDispatch();
  const dayWorkReducer = useSelector((state) => state.dayWorkReducer);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // API.getListAskComeLeave(dispatch, filterAskComeLate);
  };

  return (
    <>
      <HeaderMenuDrawer titleScreen={'Quản lý'} />
      <Provider>
        <Tab.Navigator
          // initialRouteName={'AskComeLeave'}
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
          swipeEnabled={false}
          initialLayout={{width: Dimensions.get('window').width}}>
          <Tab.Screen
            name={'Account'}
            component={AccountManagement}
            options={{tabBarLabel: 'Người dùng'}}
            // initialParams={{demandCode: '111'}}
          />
          <Tab.Screen
            name={'Company'}
            component={CompanyManagement}
            // initialParams={{demandCode: demandCode[0]}}
            options={{tabBarLabel: 'Công ty'}}
          />
        </Tab.Navigator>
        <Portal>
          <ButtonPlusFAB />
        </Portal>
      </Provider>
    </>
  );
};

export default TabManagement;
