import {useNavigation, useRoute} from '@react-navigation/native';
import React, {
  Component,
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import Context from '../../../../context/context';
import moment from 'moment';
import {useSelector} from 'react-redux';
import commons from '../../../commons';
const sumComeLeave = (accumulator, currentValue, key) => {
  return accumulator + currentValue[key];
};
const AskDayOffCompany = (props) => {
  const context = useContext(Context);
  const reportReducer = useSelector((state) => state.reportReducer);
  const {
    workDaysCompany,
    askDayOffInCompany,
    askComeLeaveInCompany,
    usersInCompany,
  } = reportReducer;

  const {dateToFilter: date, setDateToFilter: setDate} = context;
  let daysInMonth = moment(date).daysInMonth();

  const [state, setState] = useState({});
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
  const filterData = useCallback((data, key, value, type) => {
    // console.log(
    //   '🚀 ~ file: ListReportCompany.js ~ line 20 ~ filterData ~ data',
    //   data,
    // );
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

  const tableData = [];

  for (let i = 0; i < usersInCompany.length; i++) {
    let msg = '';
    const rowData = [];
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
          rowData.push(i + 1);
          break;
        case -2:
          rowData.push(usersInCompany[i]?.name);
          break;
        case -1:
          rowData.push(usersInCompany[i]?.roleId?.name);
          break;
        case 0:
          if (usersInCompany[i]?.dateOfBirth) {
            rowData.push(
              moment(usersInCompany[i]?.dateOfBirth).format(
                commons.FORMAT_DATE_VN,
              ),
            );
          } else {
            rowData.push(commons.noData);
          }
          break;
        case daysInMonth + 1:
          msg = 0;
          if (dataEachUser) {
            msg =
              filterData(dataEachUser?.results || [], 'isSuccessDay', true)
                .length || 0;
          }
          rowData.push(msg);
          break;

        default:
          msg = '';
          if (dataEachUser) {
            if (dataEachDay && dataEachDay?.checkin && dataEachDay?.checkout) {
              msg = 'X';
            }
          }
          rowData.push(msg);
          break;
      }
    }
    tableData.push(rowData);
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: 'lightgray'}}>
            <Row
              data={state.tableHead}
              widthArr={state.widthArr}
              style={{...styles.header}}
              textStyle={{...styles.text, color: 'white', fontWeight: 'bold'}}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={state.widthArr}
                  style={[
                    styles.row,
                    index % 2 && {backgroundColor: 'rgba(0,0,0,0.05)'},
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(AskDayOffCompany);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  header: {height: 50, backgroundColor: commons.colorMain70},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: 'white'},
  // row: {height: 40, backgroundColor: '#E7E6E1'},
});
