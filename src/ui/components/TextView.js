import React, {useState, memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Keyboard} from 'react-native';
import {IconView, IconViewType} from './';
import PropTypes from 'prop-types';
import commons from '../commons';

function iconLeft(props) {
  if (props.nameIconLeft || props.typeIconLeft === 'image') {
    const onPress = () => {
      props.onPressIconLeft && props.onPressIconLeft();
    };
    return (
      <IconView
        {...props}
        onPress={props.onPressIconLeft && onPress}
        style={[styles.styleIcon, props.styleIconLeft]}
        name={props.nameIconLeft}
        type={props.typeIconLeft || 'LocalIcon'}
        size={props.sizeIconLeft || commons.sizeIconText}
        color={props.colorIconLeft || commons.colorIcon}
      />
    );
  }
}

function centerElement(props) {
  if (!props || (props.centerElement && props.centerElement.props)) {
    return <View style={styles.customTitle}>{props.centerElement}</View>;
  } else {
    const onPress = () => {
      if (props.onPressText) {
        Keyboard.dismiss();
        props.onPressText({id: props.id, data: props.value});
      } else {
        // neu khong co onPressText thi dung onPress
        Keyboard.dismiss();
        props.onPress({id: props.id, data: props.value});
      }
    };
    let disabled =
      props.disabled !== undefined
        ? props.disabled
        : props.onPressText
        ? false
        : true;
    let style = props.disabled
      ? props.styleContainerTextDisable
      : [styles.styleContainerText, props.styleContainerText];
    let styleText = props.disabled
      ? props.styleTextDisabled
      : [styles.styleText, props.styleText];
    const contentText = props.children ? (
      <Text style={styleText} numberOfLines={props.numberOfLines}>
        {' '}
        {props.children}{' '}
      </Text>
    ) : (
      <View style={style}>
        {props.title ? (
          <Text style={[styles.styleTitle, props.styleTitle]}>
            {props.title}
          </Text>
        ) : null}
        {props.value ? (
          <Text
            style={[styles.styleValue, props.styleValue]}
            numberOfLines={props.numberOfLines}>
            {props.value}
          </Text>
        ) : null}
      </View>
    );
    return (
      <TouchableOpacity style={style} disabled={disabled} onPress={onPress}>
        {contentText}
      </TouchableOpacity>
    );
  }
}

function iconRight(props) {
  if (props.nameIconRight) {
    const onPress = () => {
      props.onPressIconRight && props.onPressIconRight();
    };
    return (
      <IconView
        onPress={props.onPressIconRight && onPress}
        style={[styles.styleIcon, props.styleIconRight]}
        name={props.nameIconRight}
        type={props.typeIconRight || 'LocalIcon'}
        size={props.sizeIconRight || commons.sizeIconText}
        color={props.colorIconRight || commons.colorIcon}
      />
    );
  }
}

const TextView = memo((props) => {
  const onPress = () => {
    if (props.onPress) {
      Keyboard.dismiss();
      props.onPress({id: props.id, data: props.data});
    }
  };
  let disabled =
    props.disabled !== undefined
      ? props.disabled
      : props.onPress
      ? false
      : true;
  let style = props.disabled
    ? props.styleDisable
    : [styles.styleContainer, props.style];
  return (
    <TouchableOpacity style={style} disabled={disabled} onPress={onPress}>
      {iconLeft(props)}
      {props.leftElement}
      {centerElement(props)}
      {props.rightElement}
      {iconRight(props)}
    </TouchableOpacity>
  );
});

TextView.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleDisable: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTextDisabled: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleText: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  textTransform: PropTypes.string,
};

TextView.defaultProps = {
  style: {
    // justifyContent: 'center',
  },
  styleText: {
    color: 'black',
    fontSize: 14,
  },
  styleTextDisabled: {
    color: 'gray',
    fontSize: 14,
  },
};

const styles = StyleSheet.create({
  styleContainer: {
    flexDirection: 'row',
    // backgroundColor: "#234",
  },

  styleContainerText: {
    position: 'relative',
  },

  styleText: {
    color: 'black',
    fontSize: 14,
  },
  styleTextDisabled: {
    color: 'gray',
    fontSize: 14,
  },

  styleIcon: {
    alignSelf: 'center',
  },

  customTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleTitle: {
    // fontFamily: 'Lato-Regular',
    fontSize: commons.fontSizeTitleText,
    color: 'gray',
    fontStyle: 'italic',
  },

  styleValue: {
    // fontFamily: 'Lato-Regular',
    fontSize: commons.fontSize14,
    color: commons.colorText,
  },
});

export default TextView;
