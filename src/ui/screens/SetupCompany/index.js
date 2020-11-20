import {useNavigation} from '@react-navigation/native';
import {HeaderMenuDrawer, TextView} from 'cc-components';
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {appNavigate} from '../../../navigations';

const SetupCompany = (props) => {
  const navigation = useNavigation();
  const navigateToChooseAddress = () => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'ChooseAddress');
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen="Cấu hình công ty" />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <TextView
          value="address"
          styleValue={{fontSize: 50}}
          onPress={navigateToChooseAddress}
        />
      </ScrollView>
    </>
  );
};

export default SetupCompany;

const styles = StyleSheet.create({});
