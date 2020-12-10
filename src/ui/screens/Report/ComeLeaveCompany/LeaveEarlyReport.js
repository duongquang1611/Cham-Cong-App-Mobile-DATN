import React, {memo} from 'react';
import {View, Text} from 'react-native';
import ListReportCompany from '../ListReportCompany';
import {useSelector} from 'react-redux';
import styles from '../styles';
import {TypeTabReport} from '../TypeTabReport';
const LeaveEarlyReport = (props) => {
  const reportReducer = useSelector((state) => state.reportReducer);
  const {
    workDaysCompany,
    askDayOffInCompany,
    // askComeLeaveInCompany,
  } = reportReducer;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ListReportCompany typeTab={TypeTabReport.leave_early} />
    </View>
  );
};

export default memo(LeaveEarlyReport);
