import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ImageBackground, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import HeaderView from './HeaderView';

export default function ScreenBase(props) {
  const {
    isScroll,
    styleHeader,
    styleContent,
    isToolbar,
    styleBackground,
    imageBg,
    resizeMode,
    renderFooter,
    children,
  } = props;
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );

  let isScrollContent = isScroll !== undefined ? isScroll : true;
  let style = [styles.styleBackground, styleBackground];
  return (
    <>
      {imageBg && (
        <ImageBackground
          style={style}
          resizeMode={resizeMode || 'stretch'}
          source={imageBg}
          onStartShouldSetResponder={() => Keyboard.dismiss()}
        />
      )}
      <HeaderView
        isToolbar={isToolbar || true}
        style={styleHeader}
        isHeaderBottom={!checkAuth || isSignedIn}
        {...props}
      />
      {isScrollContent ? (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[{flexGrow: 1}, styleContent]}
          showsVerticalScrollIndicator={false}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={[{flex: 1}, styleContent]}
          onStartShouldSetResponder={() => Keyboard.dismiss()}>
          {children}
        </View>
      )}
      {renderFooter}
    </>
  );
}

ScreenBase.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isToolbar: PropTypes.bool,
  isShowBack: PropTypes.bool,
  imageHeader: PropTypes.number,
  headerBottomView: PropTypes.object,
  colorsLinearGradient: PropTypes.array,
};

const styles = StyleSheet.create({
  styleBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F2F2F2',
    position: 'absolute',
  },

  styleLinearGradient: {
    position: 'relative',
  },
});
