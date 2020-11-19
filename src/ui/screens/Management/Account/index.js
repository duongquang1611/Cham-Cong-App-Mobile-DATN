import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {Portal, Provider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import models from '../../../../models';
import API from '../../../../networking';
import commons from '../../../commons';
import ButtonPlusFAB from '../ButtonPlusFAB';
import {CustomFlatList, showAlert} from 'cc-components';
import ItemAccount from './ItemAccount';
const EmptyList = () => {
  return (
    <Text style={{textAlign: 'center', marginTop: 10}}>Chưa có dữ liệu</Text>
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
  const authReducer = useSelector((state) => state.authReducer);
  const {userData} = authReducer;
  // console.log('AccountManagement -> userData', userData);
  const [state, setState] = useState({
    allUsers: [],
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
    let res = await API.GET(API.searchUsers, filter);
    // console.log('AccountManagement -> res', res);
    if (res && res.length > 0) {
      setState({...state, allUsers: res, refreshing: false});
    } else {
      setState({...state, refreshing: false});
    }
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
      onPressOK: onPressDeleteAccount,
    });
  };
  const editAccount = async (userId) => {
    // let res = await API.DELETE(API.detailUser(userId));
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
    <FlatList
      data={state.allUsers}
      renderItem={renderItem}
      keyExtractor={(item, index) => {
        return index.toString();
      }}
      extraData={state.allUsers}
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
    // <CustomFlatList
    //   refreshing={state.refreshing}
    //   onRefresh={onRefresh}
    //   data={state.allUsers}
    //   renderItem={renderItem}
    // />
  );
};

export default AccountManagement;

const styles = StyleSheet.create({});
