import {Alert, StyleSheet, Text, View} from 'react-native';

const showAlert = (props = {}) => {
  const {
    title,
    msg,
    onPressOK = null,
    onPressCancel = null,
    showCancel = false,
  } = props;
  return Alert.alert(
    title || 'Chấm Công',
    msg || '',
    [
      showCancel && {
        text: 'Cancel',
        onPress: onPressCancel,
        style: 'cancel',
      },
      {text: 'OK', onPress: onPressOK},
    ],
    {cancelable: false},
  );
};

export default showAlert;

const styles = StyleSheet.create({});
