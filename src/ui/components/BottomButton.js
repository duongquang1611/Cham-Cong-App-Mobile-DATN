import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import baseStyles from '../../baseStyles';
import TextView from './TextView';
const BottomButton = (props) => {
  const {onPress, id, style, styleSub, styleText, text = 'Submit'} = props;
  return (
    <View style={[styles.containerBottomButton, style]}>
      <TextView
        id={id}
        onPress={onPress}
        style={[styles.subContainerBottomButton, styleSub]}
        styleText={[styles.textBottomButton, styleText]}>
        {text}
      </TextView>
    </View>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  ...baseStyles,
});
