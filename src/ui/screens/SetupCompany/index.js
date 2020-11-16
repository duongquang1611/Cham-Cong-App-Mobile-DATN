import {HeaderMenuDrawer} from 'cc-components';
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const SetupCompany = () => {
  return (
    <>
      <HeaderMenuDrawer titleScreen="Cấu hình công ty" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}></ScrollView>
    </>
  );
};

export default SetupCompany;

const styles = StyleSheet.create({});
