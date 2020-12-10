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
import {
  Table,
  TableWrapper,
  Row,
  Col,
  Rows,
  Cell,
} from 'react-native-table-component';
import moment from 'moment';
import {useSelector} from 'react-redux';
import Context from '../../../context/context';
import commons from '../../commons';
import {TypeTabReport} from './TypeTabReport';

const ListReportCompany = (props) => {
  const context = useContext(Context);
  const {typeTab = TypeTabReport.work_day} = props;
  const reportReducer = useSelector((state) => state.reportReducer);
  const {dataReport} = reportReducer;
  const {
    workDays = {},
    report = {},
    tableHead = [],
    widthArr = [],
  } = dataReport;

  let tableData = [];
  if (!commons.isEmptyObject(report)) {
    tableData =
      report[
        typeTab === TypeTabReport.work_day
          ? 'workDay'
          : typeTab === TypeTabReport.come_late
          ? 'comeLate'
          : 'leaveEarly'
      ];
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: 'lightgray'}}>
            {/* <Col
                data={usersInCompany.map((item) => item?.name)}
                style={{backgroundColor: 'rgba(0,0,0,0.05)'}}
                heightArr={widthArr}
                textStyle={styles.text}
              /> */}
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={{...styles.header}}
              textStyle={{...styles.text, color: 'white', fontWeight: 'bold'}}
            />
          </Table>
          {Array.isArray(tableData) && tableData.length > 0 && (
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {/* <Rows
                data={tableData}
                // flexArr={[2, 1, 1]}
                widthArr={widthArr}
                style={styles.row}
                textStyle={styles.text}
              /> */}
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && {backgroundColor: 'rgba(0,0,0,0.05)'},
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default memo(ListReportCompany);
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
  singleHead: {width: 80, height: 40, backgroundColor: '#c8e1ff'},
  table: {borderWidth: 1, borderColor: '#C1C0B9'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
});
