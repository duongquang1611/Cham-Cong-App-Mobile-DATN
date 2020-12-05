import React from 'react';
import {View, Text} from 'react-native';
import ListReportCompany from '../ListReportCompany';
import {useSelector} from 'react-redux';
import styles from '../styles';
import {TypeTabReport} from '../TypeTabReport';
const WorkDayCompany = (props) => {
  const reportReducer = useSelector((state) => state.reportReducer);
  const {
    workDaysCompany,
    askDayOffInCompany,
    askComeLeaveInCompany,
  } = reportReducer;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ListReportCompany {...props} typeTab={TypeTabReport.work_day} />
    </View>
  );
};

export default WorkDayCompany;
