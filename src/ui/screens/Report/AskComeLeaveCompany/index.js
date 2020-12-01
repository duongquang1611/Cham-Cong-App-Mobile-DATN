import React from 'react';
import {View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import ListUserCompany from '../ListUserCompany';
import styles from '../styles';
import {TypeTabReport} from '../TypeTabReport';
const AskComeLeaveCompany = () => {
  const reportReducer = useSelector((state) => state.reportReducer);
  const {askComeLeaveInCompany} = reportReducer;
  return (
    <View>
      <ListUserCompany
        typeTab={TypeTabReport.come_leave}
        detailData={askComeLeaveInCompany}
      />
    </View>
  );
};

export default AskComeLeaveCompany;
