import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useContext, useEffect, useState} from 'react';
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
import ComeLateReport from './ComeLeaveCompany/ComeLateReport';
import LeaveEarlyReport from './ComeLeaveCompany/LeaveEarlyReport';
import moment from 'moment';
import {TypeTabReport} from './TypeTabReport';
let filterComeLeave = {comeLeave: true};
let filterMonthYear = commons.getDayMonthYear(undefined, false);
let sort = {sortType: 'roleId.level', sortValue: -1};
let tableData = {workDayReport: [], comeLateReport: [], leaveEarlyReport: []};
const sumComeLeave = (accumulator, currentValue, key) => {
  return accumulator + currentValue[key];
};

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
  const {
    workDaysCompany,
    askDayOffInCompany,
    // askComeLeaveInCompany,
    usersInCompany,
  } = reportReducer;
  // const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let daysInMonth = moment(date).daysInMonth();

  const [state, setState] = useState({
    tableHead: [],
    widthArr: [],
    // workDayTableData:[],
    // comeLateTableData:[],
    // leaveEarlyTableData:[]
  });

  const getData = async (getFullData = false, type) => {
    // !isLoading && setIsLoading(true);
    // commons.wait(2000).then(() => setIsLoading(false));
    if (type && type === 'users') {
      API.getListUsersInCompany(dispatch, {...sort});
    } else if (getFullData) {
      await Promise.all([
        API.getListUsersInCompany(dispatch, {...sort}),
        API.getListDayWorkCompany(dispatch, filterMonthYear),
        // API.getListAskComeLeaveInCompany(dispatch, {
        //   ...filterComeLeave,
        //   ...filterMonthYear,
        // }),
        API.getListAskDayOffInCompany(dispatch),
      ]);
    } else {
      await Promise.all([
        API.getListDayWorkCompany(dispatch, filterMonthYear),
        // API.getListAskComeLeaveInCompany(dispatch, {
        //   ...filterComeLeave,
        //   ...filterMonthYear,
        // }),
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
      if (showPicker) {
        const selectedDate = newDate || date;
        console.log('vao day', newDate);
        togglePicker(false);
        setDate(selectedDate);
      }

      // console.log({selectedDate});
    },
    [date, showPicker],
  );

  useEffect(() => {
    let tableHeadDays = ['STT', 'Họ tên', 'Chức vụ', 'Ngày sinh'];
    let widthArrDays = [40, 150, 100, 120];
    for (let i = 0; i < daysInMonth + 1; i++) {
      if (i === daysInMonth) {
        tableHeadDays.push('Tổng');
      } else tableHeadDays.push(i + 1);
      widthArrDays.push(60);
    }
    setState({...state, tableHead: tableHeadDays, widthArr: widthArrDays});
  }, [daysInMonth]);

  const getDetailData = useCallback((key = '_id', value, data) => {
    let detail = data?.find((item) => item[key] === value);
    return detail || null;
  });
  let tableData = [];

  const fillSheet = (
    dataEachUser,
    dataEachDay,
    typeTab = TypeTabReport.work_day,
  ) => {
    let msg = '';
    switch (typeTab) {
      case TypeTabReport.work_day:
        if (dataEachDay?.checkin && dataEachDay?.checkout) {
          msg = 'X';
        }

        return msg;
      case TypeTabReport.come_late:
        if (dataEachDay?.minutesComeLate)
          msg = dataEachDay?.minutesComeLate + 'ph';
        return msg;
      case TypeTabReport.leave_early:
        if (dataEachDay?.minutesLeaveEarly)
          msg = dataEachDay?.minutesLeaveEarly + 'ph';
        return msg;

      default:
        break;
    }
  };
  const filterData = useCallback((data, key, value, type) => {
    switch (type) {
      case 'COME_LEAVE':
        return data.filter(
          (item) =>
            item['minutesComeLate'] > 0 || item['minutesLeaveEarly'] > 0,
        ).length;
      case 'COME_LATE':
        return data.filter((item) => item['minutesComeLate'] > 0).length;
      case 'LEAVE_EARLY':
        return data.filter((item) => item['minutesLeaveEarly'] > 0).length;
      case 'MINUTES_COME_LATE':
        return data.reduce(
          (accumulator, currentValue) =>
            sumComeLeave(accumulator, currentValue, key),
          0,
        );
      case 'MINUTES_LEAVE_EARLY':
        return data.reduce(
          (accumulator, currentValue) =>
            sumComeLeave(accumulator, currentValue, key),
          0,
        );
      default:
        return data.filter((item) => item[key] === value);
    }
  }, []);

  for (let i = 0; i < usersInCompany.length; i++) {
    let msg = '';
    let rowDataWD = []; // work day
    let rowDataCL = []; // come late
    let rowDataLE = []; // leave early
    let dataEachUser = getDetailData(
      '_id',
      usersInCompany[i]?._id,
      workDaysCompany,
    );

    let dataEachDay = '';
    for (let j = -3; j < daysInMonth + 2; j++) {
      dataEachDay = getDetailData('day', j, dataEachUser?.results);

      switch (j) {
        case -3:
          rowDataWD.push(i + 1);
          rowDataCL.push(i + 1);
          rowDataLE.push(i + 1);
          break;
        case -2:
          let name = usersInCompany[i]?.name;
          rowDataWD.push(name);
          rowDataCL.push(name);
          rowDataLE.push(name);
          break;
        case -1:
          let roleName = usersInCompany[i]?.roleId?.name;
          rowDataWD.push(roleName);
          rowDataWD.push(roleName);
          rowDataWD.push(roleName);
          break;
        case 0:
          let dateOfBirthFormat = commons.noData;
          if (usersInCompany[i]?.dateOfBirth) {
            dateOfBirthFormat = moment(usersInCompany[i]?.dateOfBirth).format(
              commons.FORMAT_DATE_VN,
            );
          }
          rowDataWD.push(dateOfBirthFormat);
          rowDataCL.push(dateOfBirthFormat);
          rowDataLE.push(dateOfBirthFormat);
          break;
        case daysInMonth + 1:
          // sum
          msg = 0;
          if (dataEachUser) {
            msg =
              filterData(dataEachUser?.results || [], 'isSuccessDay', true)
                .length || 0;
          }
          rowDataWD.push(msg);
          break;

        default:
          // check or uncheck
          msg = '';
          if (dataEachUser && dataEachDay) {
            msg = fillSheet(dataEachUser, dataEachDay);
          }

          rowDataWD.push(msg);
          break;
      }
    }
    console.log({rowDataWD});
    tableData.push(rowDataWD);
  }
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
        {/* {isLoading && <LoadingView />} */}
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
          />
          {/* <Tab.Screen
            name={'AskComeLeaveCompany'}
            component={AskComeLeaveCompany}
            options={{tabBarLabel: 'Muộn, Sớm'}}
           
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
          /> */}

          <Tab.Screen
            name={'ComeLateReport'}
            component={ComeLateReport}
            options={{tabBarLabel: 'Đi muộn'}}
          />
          <Tab.Screen
            name={'LeaveEarlyReport'}
            component={LeaveEarlyReport}
            options={{tabBarLabel: 'Về sớm'}}
          />
        </Tab.Navigator>
        <Portal>
          <ButtonExportFAB {...{exportWorkDay, exportComeLeave}} />
        </Portal>
      </Provider>
    </>
  );
};

export default memo(Report);
