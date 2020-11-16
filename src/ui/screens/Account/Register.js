import {HeaderMenuDrawer} from 'cc-components';
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const Register = () => {
  return (
    <>
      <HeaderMenuDrawer titleScreen="Tạo tài khoản" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}></ScrollView>
    </>
  );
};

export default Register;

const styles = StyleSheet.create({});
