import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import commons from '../../commons';
import styles from './styles';
const TextRequired = (props) => {
  const {type = 'required'} = props;
  let msg = 'Vui lòng điền đầy đủ thông tin';
  switch (type) {
    case 'required':
      break;

    default:
      msg = 'Thông tin không hợp lệ.';
      break;
  }
  return <Text style={styles.error}>{msg}</Text>;
};

const TextInputController = (props) => {
  const {
    name,
    placeholder = '',
    defaultValue = '',
    errors,
    control,
    keyboardType = 'default',
    editable = true,
  } = props;
  let rules = {required: true};
  if (keyboardType === 'numeric') rules.min = 0;
  //   console.log(errors);
  return (
    <View style={styles.containerRow}>
      <Text style={{flex: 1, fontSize: 16}}>{placeholder}</Text>
      <View style={{flex: 0.2}} />
      <View style={{flex: 2}}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
              editable={editable}
            />
          )}
          name={name}
          defaultValue={defaultValue}
          rules={rules}
        />
        {errors[name] && <TextRequired type={errors[name].type} />}
      </View>
    </View>
  );
};

export default TextInputController;
