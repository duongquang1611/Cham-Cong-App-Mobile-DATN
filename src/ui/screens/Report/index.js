import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Portal, Provider} from 'react-native-paper';

import models from '../../../models';
import API from '../../../networking';
import commons from '../../commons';
import {HeaderMenuDrawer, LoadingView} from '../../components';
import AskComeLeaveCompany from './AskComeLeaveCompany';
import AskDayOffCompany from './AskDayOffCompany';
import WorkDayCompany from './WorkDayCompany';
import MonthPicker from 'react-native-month-year-picker';

import styles from './styles';
import ButtonExportFAB from './ButtonExportFAB';
import Context from '../../../context/context';

let filterComeLeave = {comeLeave: true};
let filterMonthYear = commons.getDayMonthYear(undefined, false);
let sort = {sortType: 'roleId.level', sortValue: -1};
const Report = () => {
  const context = useContext(Context);
  const {dateToFilter: date, setDateToFilter: setDate} = context;
  const Tab = createMaterialTopTabNavigator();
  let user = models.getUserInfo();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const detailDayWork = useSelector(
    (state) => state.dayWorkReducer.detailDayWork,
  );
  const reportReducer = useSelector((state) => state.reportReducer);
  // const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const getData = async (getFullData = false, type) => {
    if (type && type === 'users') {
      API.getListUsersInCompany(dispatch, {...sort});
    } else if (getFullData) {
      await Promise.all([
        API.getListUsersInCompany(dispatch, {...sort}),
        API.getListDayWorkCompany(dispatch, filterMonthYear),
        API.getListAskComeLeaveInCompany(dispatch, {
          ...filterComeLeave,
          ...filterMonthYear,
        }),
        API.getListAskDayOffInCompany(dispatch),
      ]);
    } else {
      await Promise.all([
        API.getListDayWorkCompany(dispatch, filterMonthYear),
        API.getListAskComeLeaveInCompany(dispatch, {
          ...filterComeLeave,
          ...filterMonthYear,
        }),
        API.getListAskDayOffInCompany(dispatch),
      ]);
    }
  };
  useEffect(() => {
    console.log('effect1');
    getData(false, 'users');
  }, [user?._id]);

  useEffect(() => {
    console.log('effect2');
    filterMonthYear = commons.getDayMonthYear(date, false);
    console.log({filterMonthYear});
    getData(false);
  }, [detailDayWork, date]);
  const togglePicker = useCallback((value) => setShowPicker(value), []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;

      togglePicker(false);
      setDate(selectedDate);
      // console.log({selectedDate});
    },
    [date, showPicker],
  );
  const exportWorkDay = () => {
    console.log('export work day');
  };
  const exportComeLeave = () => {
    console.log('export come leave');
  };

  return (
    <>
      <HeaderMenuDrawer
        titleScreen={`Chấm công tháng ${
          date.getMonth() + 1
        } - ${date.getFullYear()}`}
        nameMenuRight={'calendar'}
        colorMenuRight={'white'}
        sizeMenuRight={commons.sizeIcon20}
        onPressMenuRight={() => {
          togglePicker(true);
        }}
      />

      <Provider>
        {showPicker && (
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={new Date(1980, 1)}
            maximumDate={new Date(2050, 12)}
            locale="vi"
            okButton="Đồng ý"
            cancelButton="Hủy"
          />
        )}
        {/* <WorkDayCompany {...{date}} /> */}
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
          swipeEnabled={false}
          initialLayout={{width: Dimensions.get('window').width}}>
          <Tab.Screen
            name={'WorkDayCompany'}
            component={WorkDayCompany}
            options={{tabBarLabel: 'Chấm công'}}
            // initialParams={{filterMonthYear}}
            // listeners={({navigation}) => ({
            //   focus: (e) => {
            //     currentTabFocus = TypeTabManagement.account;
            //   },
            // })}
          />
          <Tab.Screen
            name={'AskComeLeaveCompany'}
            component={AskComeLeaveCompany}
            // initialParams={{filterMonthYear}}
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
            // initialParams={{filterMonthYear}}
            options={{tabBarLabel: 'Xin nghỉ'}}
            // listeners={({navigation}) => ({
            //   focus: (e) => {
            //     currentTabFocus = TypeTabManagement.company;
            //   },
            // })}
          />
        </Tab.Navigator>
        <Portal>
          <ButtonExportFAB {...{exportWorkDay, exportComeLeave}} />
        </Portal>
      </Provider>
    </>
  );
};

export default Report;
