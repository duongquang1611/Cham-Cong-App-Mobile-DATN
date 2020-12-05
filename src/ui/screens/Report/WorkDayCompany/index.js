import React from 'react';
import {View, Text} from 'react-native';
import ListUserCompany from '../ListUserCompany';
import {useSelector} from 'react-redux';
import styles from '../styles';
import {TypeTabReport} from '../TypeTabReport';
const WorkDayCompany = () => {
  const reportReducer = useSelector((state) => state.reportReducer);
  const {
    workDaysCompany,
    askDayOffInCompany,
    askComeLeaveInCompany,
  } = reportReducer;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ListUserCompany
        detailData={workDaysCompany}
        typeTab={TypeTabReport.work_day}
      />
    </View>
  );
};

export default WorkDayCompany;
