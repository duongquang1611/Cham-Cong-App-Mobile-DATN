import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ConfirmDayOffTemplate from './components/ConfirmDayOffTemplate';

const HistoryConfirmDayOff = () => {
  return (
    <ConfirmDayOffTemplate
      statusDayOff={0}
      reversed={true}
      showButton={false}
    />
  );
};

export default HistoryConfirmDayOff;

const styles = StyleSheet.create({});
