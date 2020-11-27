import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import baseStyles from '../../baseStyles';
import commons from '../commons';
import TextView from './TextView';
const BottomButton = (props) => {
  const {
    onPress,
    id,
    style,
    styleSub,
    styleText,
    text = 'Submit',
    showCancel = false,
    onPressCancel,
    idCancel,
    textCancel = 'Cancel',
    styleSubCancel,
    styleTextCancel,
  } = props;
  return (
    <View style={[styles.containerBottomButton, style]}>
      <View
        style={{flexDirection: 'row', height: commons.heightHeader, flex: 1}}>
        {showCancel && (
          <>
            <TextView
              id={idCancel}
              onPress={onPressCancel}
              style={[
                styles.subContainerBottomButton,
                {backgroundColor: 'orange'},
                styleSubCancel,
              ]}
              styleText={[styles.textBottomButton, styleTextCancel]}>
              {textCancel}
            </TextView>
            <View style={{width: 5}} />
          </>
        )}
        <TextView
          id={id}
          onPress={onPress}
          style={[styles.subContainerBottomButton, styleSub]}
          styleText={[styles.textBottomButton, styleText]}>
          {text}
        </TextView>
      </View>
    </View>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  ...baseStyles,
});
