import React from 'react';
import {StyleSheet, Text, ActivityIndicator} from 'react-native';
import commons from '../../commons';

const renderFooter = (onEndReachedCalledDuringMomentum) => {
  return onEndReachedCalledDuringMomentum ? (
    <></>
  ) : (
    <>
      {/* <Text
        style={{
          alignContent: 'center',
          textAlign: 'center',
          marginTop: commons.margin,
        }}>
        Đang tải thêm
      </Text> */}
      {/* <ActivityIndicator color={commons.colorMain} /> */}
    </>
  );
};

export default renderFooter;

const styles = StyleSheet.create({});
