import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import commons from '../../../commons';
import styles from './styles';

const ColumnBaseView = (props) => {
  const {
    title,
    msg,
    colorMsg = 'black',
    end = false,
    reverse = false,
    showTitle = true,
  } = props;
  return (
    <View
      style={{
        ...styles.center,
        flex: 1,
        borderRightWidth: end ? 0 : 1,
        borderRightColor: 'lightgray',
      }}>
      {!reverse ? (
        <>
          <Text
            style={{
              color: colorMsg,
              fontWeight: 'bold',
              fontSize: commons.fontSizeHeader,
            }}>
            {msg}
          </Text>
          {showTitle && <Text>{title}</Text>}
        </>
      ) : (
        <>
          {showTitle && <Text>{title}</Text>}
          <Text
            style={{
              color: colorMsg,
              fontWeight: 'bold',
              fontSize: commons.fontSizeHeader,
            }}>
            {msg}
          </Text>
        </>
      )}
    </View>
  );
};
export default ColumnBaseView;
