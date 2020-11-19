import {HeaderMenuDrawer, HeaderView} from 'cc-components';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import styles from './styles';
const AddCompany = () => {
  return (
    <>
      <HeaderView
        isToolbar={true}
        isStatusBar={true}
        // nonShowBack
        titleScreen={'Thêm công ty'}
        colorIconBack="white"
      />
      <ScrollView
        style={{...styles.containerScrollView}}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}></ScrollView>
    </>
  );
};

export default AddCompany;
