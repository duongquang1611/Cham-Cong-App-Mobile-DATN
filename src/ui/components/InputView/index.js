import PropTypes from 'prop-types';
import React, {Component, createRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  ViewPropTypes,
} from 'react-native';
import {IconView} from '..';
import commons from '../../commons';
import BaseInput from './BaseInput';

export default class InputView extends BaseInput {
  render() {
    let {
      style,
      textError,
      styleTextError,
      onPressText,
      leftElement,
      rightElement,
      secureTextEntry,
      styleContainer,
      maxLength,
      styleTextCount,
    } = this.props;
    const {placeholder, value, isError, numberHad} = this.state;
    let disableOnPress = onPressText ? false : true;
    let showMaxLength =
      this.props.showMaxLength == undefined ? true : this.props.showMaxLength;
    return (
      <TouchableOpacity
        style={[styles.style, style]}
        disabled={disableOnPress}
        onPress={() => this.onPressText()}>
        <Animated.View
          style={[
            this.styleContainerInput(styles.styleContainer),
            styleContainer,
          ]}>
          {this.iconLeft(styles.styleIconLeft)}
          {leftElement}
          <Animated.Text style={this.styleTextLabel(styles.styleLable)}>
            {placeholder}
          </Animated.Text>
          {maxLength && showMaxLength ? (
            <Text
              style={[
                styles.styleTextCount,
                styleTextCount,
              ]}>{`${numberHad}/${maxLength}`}</Text>
          ) : null}
          <TextInput
            ref={this.input}
            {...this.props}
            secureTextEntry={this.state.secureTextEntry}
            placeholder={''}
            onTouchStart={() => Platform.OS === 'ios' && this.onPressText()}
            style={this.styleTextInput(styles.styleInput)}
            onFocus={this.onFocus}
            value={value}
            // onEndEditing = {() => this.toggle(false)}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onChangeText={this.onChangeText}
          />
          {this.iconClean(styles.styleIconClear)}
          {this.iconRight(styles.styleIconRight)}
          {secureTextEntry && this.iconShowPassword(styles.styleIconClear)}
          {rightElement}
        </Animated.View>
        {isError && (
          <Text style={[styles.styleTextError, styleTextError]}>
            {textError}
          </Text>
        )}
      </TouchableOpacity>
    );
  }
}

InputView.defaultProps = {
  activeColor: 'red',
  passiveColor: 'white',
  height: 40,
  labelHeight: 24,
  iconLeftSize: 24,
  colorTextDisable: commons.colorTextDisable,
  colorBorderDisable: commons.colorBorderDisable,
  colorBorderNormal: commons.colorHintText,
  colorBorderFocus: commons.colorMain,
  colorBorderError: 'red',

  labelStyle: {
    color: 'gray',
    fontStyle: 'italic',
    fontSize: commons.fontSize12,
    // backgroundColor: "#a34"
  },
  placeholderStyle: {
    color: commons.colorHintText,
    fontStyle: 'italic',
    fontSize: 10,
  },

  // easing: Easing.bezier(0.2, 1, 0.3, 1),
};

const styleIcon = {
  width: commons.widthIconInput,
  borderRadius: commons.borderRadius4,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 3,
  color: commons.colorMain,
};

const styles = StyleSheet.create({
  style: {
    borderRadius: commons.borderRadius4,
  },

  styleContainer: {
    flexDirection: 'row',
    // backgroundColor: '#345',
    alignItems: 'center',
    borderWidth: 0.75,
    borderColor: commons.colorHintText,
    borderRadius: commons.borderRadius4,
  },

  styleLable: {
    // padding: 3,
    fontStyle: 'italic',
    color: 'gray',
    // left: 5,
    position: 'absolute',
    alignSelf: 'center',
    fontSize: commons.fontSize11,
  },

  styleInput: {
    flex: 1,
    borderRadius: commons.borderRadius4,
    color: commons.colorText,
  },

  styleIconLeft: {
    ...styleIcon,
    borderTopLeftRadius: commons.borderRadius4,
    borderBottomLeftRadius: commons.borderRadius4,
    alignSelf: 'center',
  },
  styleIconRight: {
    ...styleIcon,
    borderTopRightRadius: commons.borderRadius4,
    borderBottomRightRadius: commons.borderRadius4,
    alignSelf: 'center',
  },

  styleIconClear: {
    ...styleIcon,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },

  styleTextError: {
    fontStyle: 'italic',
    color: 'red',
    marginHorizontal: commons.margin,
    fontSize: commons.fontSize11,
  },

  styleTextCount: {
    position: 'absolute',
    top: -20,
    right: 0,
    fontSize: commons.fontSize12,
    fontStyle: 'italic',
    fontWeight: '700',
    color: commons.colorIcon,
  },
});
