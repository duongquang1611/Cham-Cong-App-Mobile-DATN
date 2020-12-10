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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Portal, Provider} from 'react-native-paper';

import models from '../../../models';
import API from '../../../networking';
import commons from '../../commons';
import {HeaderMenuDrawer, LoadingView, showAlert} from '../../components';
// import AskComeLeaveCompany from './AskComeLeaveCompany';
// import AskDayOffCompany from './AskDayOffCompany';
import WorkDayCompany from './WorkDayCompany';
import MonthPicker from 'react-native-month-year-picker';

import styles from './styles';
import ButtonExportFAB from './ButtonExportFAB';
import Context from '../../../context/context';
import ComeLateReport from './ComeLeaveCompany/ComeLateReport';
import LeaveEarlyReport from './ComeLeaveCompany/LeaveEarlyReport';
import moment from 'moment';
import {TypeTabReport} from './TypeTabReport';
import {
  DocumentDirectoryPath,
  DownloadDirectoryPath,
  writeFile,
  readFile,
} from 'react-native-fs';
import XLSX from 'xlsx';
let filterComeLeave = {comeLeave: true};
let filterMonthYear = commons.getDayMonthYear(undefined, false);
let sort = {sortType: 'roleId.level', sortValue: -1};
let tableData = {workDayReport: [], comeLateReport: [], leaveEarlyReport: []};
const sumComeLeave = (accumulator, currentValue, key) => {
  return accumulator + currentValue[key];
};

const DDP =
  (Platform.OS === 'ios' ? DocumentDirectoryPath : DownloadDirectoryPath) + '/';
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
  const {dataReport} = reportReducer;
  const {
    workDays = {},
    report = {
      workDay: [],
      comeLate: [],
      leaveEarly: [],
    },
    tableHead = [],
    widthArr = [],
  } = dataReport;

  const [showPicker, setShowPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let daysInMonth = moment(date).daysInMonth();

  const getData = async () => {
    API.getReportCompany(dispatch, filterMonthYear, user?.companyId?._id);
    commons.wait(1000).then(setIsLoading(false));
  };

  useEffect(() => {
    filterMonthYear = commons.getDayMonthYear(date, false);
    !isLoading && setIsLoading(true);
  }, [detailDayWork, date]);

  useEffect(() => {
    isLoading && getData();
  }, [isLoading]);

  const togglePicker = useCallback((value) => setShowPicker(value), []);
  const createSheetName = (text) => {
    text = text.replace(/([:\\\/?*\[\]]+)/g, ' ');
    return text + ' ' + filterMonthYear.month + ' - ' + filterMonthYear.year;
  };
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

  const exportExcel = async (typeExport = 'workDay') => {
    // type: workDay, comeLate, leaveEarly
    const requestWritePermission = async () => {
      console.log('permission');
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Quyền truy cập bộ nhớ',
            message: 'Ứng dụng cần cấp quyền truy cập bộ nhớ.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportExcelAfterCheckPermission();
        } else {
          showAlert({
            msg:
              'Bạn đã từ chối quyền truy cập bộ nhớ của ứng dụng. Một số chức năng có thể không hoạt động.',
          });
        }
      } catch (error) {
        console.log('Write permission err', error);
      }
    };

    requestWritePermission();

    const exportExcelAfterCheckPermission = async () => {
      let dataSheet = [];
      dataSheet = [tableHead, ...report[typeExport]];
      console.log({typeExport});
      let sheetName = '';
      switch (typeExport) {
        case 'workDay':
          sheetName = createSheetName('Báo cáo chấm công tháng');
          break;
        case 'comeLate':
          sheetName = createSheetName('Báo cáo đi muộn tháng');

          break;
        case 'leaveEarly':
          sheetName = createSheetName('Báo cáo về sớm tháng');
          break;

        default:
          break;
      }
      dataSheet.unshift([sheetName]);
      try {
        // build new workbook
        let worksheet = XLSX.utils.aoa_to_sheet(dataSheet);
        let new_workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(new_workbook, worksheet, 'SheetJS');

        // write file
        const wbout = XLSX.write(new_workbook, {
          type: 'binary',
          bookType: 'xlsx',
        });
        const file = DDP + `${sheetName}.xlsx`;
        let res = await writeFile(file, wbout, 'ascii');
        showAlert({msg: `Lưu báo cáo thành công tại đường dẫn: ${file}`});
      } catch (error) {
        console.log({error});
        showAlert({msg: 'Lỗi khi xuất báo cáo. Vui lòng thử lại.'});
      }
    };
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
        {isLoading && <LoadingView />}
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
          <ButtonExportFAB {...{exportExcel}} />
        </Portal>
      </Provider>
    </>
  );
};

export default memo(Report);
