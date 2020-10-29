import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import TextView from './TextView';
import commons from '../commons';

export default function ButtonView(props) {
  let style = [styles.style, props.style];
  let styleDisabled = [styles.styleDisabled, props.styleDisabled];
  let styleText = [styles.styleTitle, props.styleTitle];
  let styleTextDisabled = [styles.styleTextDisabled, props.styleTextDisabled];

  const onPress = (dataClick) => {
    props.onPress && props.onPress(dataClick);
  };

  return (
    <TextView
      id={props.id}
      data={props.data}
      style={style}
      styleDisable={styleDisabled}
      styleText={styleText}
      styleTextDisabled={styleTextDisabled}
      disabled={props.disabled}
      onPress={onPress}
      textTransform="uppercase">
      {props.title}
    </TextView>
  );
}

ButtonView.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleDisable: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTextDisabled: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

ButtonView.defaultProps = {
  style: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  styleDisabled: {
    backgroundColor: '#B5B5B5',
  },

  styleTitle: {
    textAlign: 'center',
    fontSize: 18,
    margin: 10,
  },

  styleTextDisabled: {
    color: '#E5E5E5',
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
  },
};

const styles = StyleSheet.create({
  style: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#345',
    borderRadius: commons.borderRadiusButton,
  },

  styleDisabled: {
    backgroundColor: '#B5B5B5',
    borderRadius: commons.borderRadiusButton,
    justifyContent: 'center',
    alignItems: 'center',
  },

  styleTitle: {
    // textTransform: 'uppercase',
    // color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },

  styleTextDisabled: {
    color: '#E5E5E5',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
});
