import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import commons from '../commons';
import HeaderView from './HeaderView';

const HeaderMenuDrawer = (props) => {
  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };
  return (
    <HeaderView
      isToolbar={true}
      isStatusBar={true}
      // nonShowBack
      titleScreen={'Home'}
      nameIconBack="menu"
      typeIconBack={'MaterialCommunityIcons'}
      colorIconBack="white"
      sizeIconBack={commons.sizeIcon24}
      onPressBack={toggleDrawer}
      {...props}
    />
  );
};

export default HeaderMenuDrawer;

const styles = StyleSheet.create({});
