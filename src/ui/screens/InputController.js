import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {InputView} from 'cc-components';
let listKeyEmailPhone = [
  'email',
  'phoneNumber',
  'representativePhoneNumber',
  'representativeEmail',
];
const HEIGHT_INPUT_DEFAULT = 40;
const TextRequired = (props) => {
  const {type = 'required', field} = props;
  let msg = 'Vui lòng điền đầy đủ thông tin';
  switch (type) {
    case 'required':
      break;

    default:
      msg = 'Thông tin không hợp lệ.';
      break;
  }
  return <Text style={styles.error}>{field.message || msg}</Text>;
};

const InputController = (props) => {
  const {
    name,
    label = '',
    placeholder = '',
    defaultValue = null,
    form,
    keyboardType = 'default',
    editable = true,
    secureTextEntry = false,
    onPressText,
    initRules = {},
    multiline = true,
    isShowClean = true,
  } = props;
  const {errors, control} = form;
  const [state, setState] = useState({
    height: 0,
  });
  // let rules = {required: true};
  let rules = {...initRules};
  if (keyboardType === 'numeric') rules.min = 0;
  //   console.log(errors);
  let changeDefaultValue = false;
  if (listKeyEmailPhone.includes(name)) {
    changeDefaultValue = true;
  }
  const updateSize = (event) => {
    setState({...state, height: event.nativeEvent.contentSize.height});
  };
  return (
    <View style={styles.containerInput}>
      {label ? (
        <Text style={styles.textLabel}>
          {label}
          {rules.required && <Text style={{color: 'red'}}>{' * '}</Text>}
        </Text>
      ) : (
        <></>
      )}
      <View style={{}}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => {
            const onChangeText = ({id, data}) => {
              onChange(data);
            };

            return (
              <InputView
                id={name}
                multiline={multiline}
                height={Math.max(HEIGHT_INPUT_DEFAULT, state.height)}
                style={[{}]}
                onContentSizeChange={updateSize}
                styleTextInput={styles.textInput}
                styleInputDisable={styles.textInput}
                colorBorderDisable={'#B7C8D1'}
                onBlur={onBlur}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                keyboardType={keyboardType}
                editable={editable}
                pointerEvents={'none'}
                onPressText={onPressText}
                secureTextEntry={secureTextEntry}
                isShowClean={isShowClean}
              />
            );
          }}
          name={name}
          defaultValue={
            defaultValue ? defaultValue : changeDefaultValue ? '' : defaultValue
          }
          rules={rules}
        />
        {errors[name] && (
          <TextRequired type={errors[name].type} field={errors[name]} />
        )}
      </View>
    </View>
  );
};

export default InputController;

const styles = StyleSheet.create({
  containerInput: {
    marginBottom: 10,
  },
  error: {
    fontStyle: 'italic',
    color: 'red',
    fontSize: 12,
  },
  textInput: {fontSize: 14, color: 'black'},
  textLabel: {fontSize: 16, marginBottom: 5},
});
