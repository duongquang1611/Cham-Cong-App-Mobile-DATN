import {HeaderView} from 'cc-components';
import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';

const AddAccount = () => {
  return (
    <>
      <HeaderView
        isToolbar={true}
        isStatusBar={true}
        // nonShowBack
        titleScreen={'Tạo tài khoản'}
        colorIconBack="white"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}></ScrollView>
    </>
  );
};

export default AddAccount;

const styles = StyleSheet.create({});
