import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-community/picker';

const NewPicker = (props) => {
  const {mode, selectedValue, onValueChange, data} = props;
  return (
    <Picker
      mode={mode || 'dropdown'}
      selectedValue={selectedValue}
      style={{minWidth: 150}}
      onValueChange={onValueChange}
      {...props}>
      {data.map((item, index) => (
        <Picker.Item label={item.name} value={item} key={index} />
      ))}
    </Picker>
  );
};

export default NewPicker;

const styles = StyleSheet.create({});
