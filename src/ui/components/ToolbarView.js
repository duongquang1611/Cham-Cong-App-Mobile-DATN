import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconView} from './';
import PropTypes from 'prop-types';
import commons from '../commons';

function getBackElement(props) {
  let nonShowBack = props.nonShowBack !== undefined ? props.nonShowBack : false;
  if (!nonShowBack) {
    let isPressBack =
      props.isPressBack !== undefined ? props.isPressBack : true;
    const navigation = useNavigation();
    const naviGoback = () => {
      props.onPressBack ? props.onPressBack() : navigation.goBack();
    };
    return (
      <IconView
        onPress={isPressBack && naviGoback}
        style={[styles.styleIcon, props.styleIconBack]}
        name={props.nameIconBack || 'back'}
        type={props.typeIconBack || 'LocalIcon'}
        size={props.sizeIconBack || commons.sizeIconToolbar}
        color={props.colorIconBack || commons.colorIconBack}
      />
    );
  }
}

function getLeftElement(props) {
  if (!props || (props.leftElement && props.leftElement.props)) {
    return props.leftElement;
  }
}

function getCenterElement(props) {
  if (!props || (props.centerElement && props.centerElement.props)) {
    return <View style={styles.customTitle}>{props.centerElement}</View>;
  }
  const colorStyle = props.tintColor ? {color: props.tintColor} : null;
  let numberOfLines = props.numberOfLinesTitle || 1;
  return (
    <View style={[styles.navBarCenterContainer]}>
      <Text
        ellipsizeMode={props.ellipsizeMode}
        numberOfLines={numberOfLines}
        style={[styles.navBarTitleText, props.styleTitle, colorStyle]}>
        {props.titleScreen}
      </Text>
      {props.subTitle && (
        <Text
          onPress={props.onPressSubTitle}
          ellipsizeMode={props.ellipsizeMode}
          numberOfLines={props.numberOfLines}
          style={[styles.subTitleText, props.styleSubTitle, colorStyle]}>
          {props.subTitle}
        </Text>
      )}
    </View>
  );
}

function getRightElement(props) {
  if (!props || (props.rightElement && props.rightElement.props)) {
    return props.rightElement;
  } else if (typeof props.nameMenuRight === 'string') {
    return (
      <IconView
        onPress={props.onPressMenuRight}
        style={[styles.styleIconRight, props.styleMenuRight]}
        name={props.nameMenuRight}
        type={props.typeIconLeft || 'LocalIcon'}
        size={props.sizeMenuRight || commons.sizeIcon}
        color={props.colorMenuRight || 'white'}
      />
    );
  }
}

export default function ToolbarView(props) {
  let style = [styles.style, props.styleToolbar];
  return (
    <View style={style} onStartShouldSetResponder={() => Keyboard.dismiss()}>
      {getCenterElement(props)}
      {getBackElement(props)}
      {getLeftElement(props)}
      {getRightElement(props)}
    </View>
  );
}

ToolbarView.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onPress: PropTypes.func,
};

ToolbarView.defaultProps = {
  style: {
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const styles = StyleSheet.create({
  style: {
    // backgroundColor: '#345',
    paddingHorizontal: 5,
    width: '100%',
    height: commons.NAV_BAR_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  //////////////////
  navBarCenterContainer: {
    marginHorizontal: 5,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  navBarTitleText: {
    fontSize: commons.fontSizeHeader,
    letterSpacing: 0.5,
    color: 'white',
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: commons.fontSizeSubHeader,
    letterSpacing: 0.5,
    color: 'white',
  },

  customTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    right: 0,
    bottom: 7,
    alignItems: 'center',
  },

  /////////////////
  styleIcon: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    // transform: [{ rotate: '250deg' }]
  },
  styleIconRight: {
    width: 40,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    // transform: [{ rotate: '250deg' }]
  },
});
