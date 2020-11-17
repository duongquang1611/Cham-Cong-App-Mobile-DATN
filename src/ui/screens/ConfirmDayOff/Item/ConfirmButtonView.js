import {TextView} from 'cc-components';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import commons from '../../../commons';
const ConfirmButtonView = (props) => {
  const {onPressAccept, onPressCancel} = props;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <TextView
        id="1"
        value="Chấp nhận"
        onPress={onPressAccept}
        style={{...styles.buttonConfirm}}
        styleValue={{...styles.textConfirm}}
      />
      <View style={{width: 10}} />
      <TextView
        id="-1"
        value="Từ chối"
        onPress={onPressCancel}
        styleValue={{...styles.textConfirm}}
        style={{...styles.buttonConfirm, backgroundColor: 'red'}}
      />
    </View>
  );
};

export default ConfirmButtonView;

const styles = StyleSheet.create({
  buttonConfirm: {
    flex: 1,
    backgroundColor: commons.PersianGreen,
    marginTop: 5,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  textConfirm: {
    color: 'white',
  },
});
