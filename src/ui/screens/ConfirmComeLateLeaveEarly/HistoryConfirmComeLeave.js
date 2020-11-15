import React from 'react';
import {View, Text} from 'react-native';
import ConfirmComeLeaveTemplate from './components/ConfirmComeLeaveTemplate';

const HistoryConfirmComeLeave = () => {
  return (
    <ConfirmComeLeaveTemplate
      statusComeLeaveAsk={0}
      reversed={true}
      typeConfirm={false}
    />
  );
};

export default HistoryConfirmComeLeave;
