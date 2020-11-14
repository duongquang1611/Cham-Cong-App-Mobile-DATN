import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {HeaderMenuDrawer} from 'cc-components';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import API from '../../../networking';
import commons from '../../commons';
import {getParamsRequest} from '../../components/CustomFlatList/getParamsRequest';
import AskComeLeave from './AskComeLeave';
import TabHistoryAskComeLeave from './HistoryAskComeLeave';

const TabAskComeLateLeaveEarly = () => {
  const Tab = createMaterialTopTabNavigator();
  let userInfo = models.getUserInfo();
  let filterAskComeLate = {
    userId: userInfo?._id,
    comeLeave: true,
  };
  const dispatch = useDispatch();
  const dayWorkReducer = useSelector((state) => state.dayWorkReducer);

  useEffect(() => {
    dayWorkReducer.changeListAskComeLeave && getData();
  }, [dayWorkReducer.changeListAskComeLeave]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    API.getListAskComeLeave(dispatch, filterAskComeLate);
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen={'Đi muộn, về sớm'} />
      <Tab.Navigator
        // initialRouteName={'AskComeLeave'}
        tabBarPosition="top"
        initialRouteName={'TabHistoryAskComeLeave'}
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
          // initialParams={{demandCode: '111'}}
        />
        <Tab.Screen
          name={'TabHistoryAskComeLeave'}
          component={TabHistoryAskComeLeave}
          // initialParams={{demandCode: demandCode[0]}}
          options={{tabBarLabel: 'Lịch sử'}}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabAskComeLateLeaveEarly;
