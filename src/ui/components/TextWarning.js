import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TextWarning = (props) => {
  const {msg = '', includeBrackets = false, style} = props;
  return (
    <Text>
      {' '}
      {includeBrackets && '('}
      <Text style={[styles.styleTextWarning, style]}>{msg}</Text>
      {includeBrackets && ')'}
    </Text>
  );
};

export default TextWarning;

const styles = StyleSheet.create({
  styleTextWarning: {
    fontStyle: 'italic',
    color: 'red',
  },
});
