import React from 'react';
import {View, Text} from 'react-native';
import ConfirmComeLeaveTemplate from './components/ConfirmComeLeaveTemplate';

const ConfirmComeLeave = () => {
  return (
    <ConfirmComeLeaveTemplate
      statusComeLeaveAsk={0}
      reversed={false}
      typeConfirm={true}
    />
  );
};

export default ConfirmComeLeave;
