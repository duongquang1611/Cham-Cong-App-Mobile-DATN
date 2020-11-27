import {useNavigation} from '@react-navigation/native';
import {LoadingView, showAlert} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../../models';
import {appNavigate} from '../../../../navigations';
import API from '../../../../networking';
import commons from '../../../commons';
import ItemAccount from './ItemAccount';
const EmptyList = () => {
  return (
    <Text style={{textAlign: 'center', marginTop: 10}}>{commons.noData}</Text>
  );
};
const SeparatorView = () => {
  return (
    <View
      style={{
        height: 0.5,
        backgroundColor: 'lightgrey',
      }}></View>
  );
};

const AccountManagement = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const {userData} = authReducer;
  const navigation = useNavigation();
  const companyReducer = useSelector((state) => state.companyReducer);
  const {allUsers} = companyReducer;
  const [state, setState] = useState({
    refreshing: true,
  });

  useEffect(() => {
    state.refreshing && getData();
  }, [state.refreshing]);

  const getData = async () => {
    let user = models.getUserInfo();
    let filter = {};
    if (
      commons.isRole('admin_company', user) ||
      commons.isRole('director', user)
    ) {
      filter.companyId = user.companyId._id;
      console.log('AccountManagement -> filter', filter);
    }
    API.getListUsers(dispatch, filter);
    // console.log('AccountManagement -> res', res);
    setState({...state, refreshing: false});
  };

  const deleteAccount = async (item) => {
    const onPressDeleteAccount = async () => {
      try {
        let res = await API.DELETE(API.detailUser(item._id));
        if (res && res.msg) {
          showAlert({msg: res.msg});
          onRefresh();
        }
      } catch (error) {
        console.log('AccountManagement -> error', error);
      }
    };
    showAlert({
      msg: `Xác nhận xóa tài khoản ${item.username} ?`,
      showCancel: true,
      onPressOK: onPressDeleteAccount,
    });
  };
  const editAccount = (item) => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'EditAccount', {
      data: item,
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <ItemAccount
        item={item}
        index={index}
        {...{deleteAccount, editAccount}}
      />
    );
  };
  const onRefresh = () => {
    setState({...state, refreshing: true});
  };
  return (
    <>
      {state.refreshing && <LoadingView />}
      <FlatList
        data={allUsers}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        extraData={allUsers}
        contentContainerStyle={{
          paddingTop: commons.margin5,
          paddingHorizontal: commons.margin,
        }}
        ListEmptyComponent={EmptyList}
        automaticallyAdjustContentInsets={false}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        removeClippedSubviews={true}
        style={{backgroundColor: 'white'}}
        initialNumToRender={10}
        ItemSeparatorComponent={SeparatorView}
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }
      />
    </>
  );
};

export default AccountManagement;

const styles = StyleSheet.create({});
