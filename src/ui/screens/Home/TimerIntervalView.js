import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import commons from '../../commons';

const TimerIntervalView = (props) => {
  const {detailDayWork} = props;
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    let diff = commons.getDiffTime(detailDayWork?.checkin);

    const interval = setInterval(() => {
      if (detailDayWork?.checkin && !detailDayWork?.checkout) {
        setTimer(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [detailDayWork, timer]);
  return (
    <Text>
      {detailDayWork?.checkin || detailDayWork?.checkout
        ? detailDayWork?.checkin && detailDayWork?.checkout
          ? commons.getDiffTime(detailDayWork?.checkin, detailDayWork?.checkout)
          : timer
        : commons.DEFAULT_TIME}
    </Text>
  );
};

export default memo(TimerIntervalView);

const styles = StyleSheet.create({});
