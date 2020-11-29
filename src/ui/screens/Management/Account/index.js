import {useNavigation} from '@react-navigation/native';
import {LoadingView, showAlert} from 'cc-components';
import React, {memo, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../../models';
import {appNavigate} from '../../../../navigations';
import API from '../../../../networking';
import actions from '../../../../redux/actions';
import commons from '../../../commons';
import ItemAccount from './ItemAccount';
const EmptyList = () => {
  return (
    <Text style={{textAlign: 'center', marginTop: 10}}>{commons.noData}</Text>
  );
};
let filter = {};

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
  const searchReducer = useSelector((state) => state.searchReducer);
  const commonReducer = useSelector((state) => state.commonReducer);
  console.log({searchReducer, commonReducer});
  const {allUsers} = companyReducer;
  const [state, setState] = useState({
    refreshing: false,
  });

  useEffect(() => {
    state.refreshing && getData();
  }, [state.refreshing]);

  const onRefresh = (clearText = false) => {
    if (clearText) filter = {};
    setState({...state, refreshing: true});
  };

  useEffect(() => {
    if (
      searchReducer.textSearchUser &&
      searchReducer.textSearchUser.trim().length !== 0
    ) {
      console.log('search');
      filter.text = searchReducer.textSearchUser;
      onRefresh();
    } else {
      onRefresh(true);
    }
  }, [searchReducer.textSearchUser]);

  const getData = async () => {
    let user = models.getUserInfo();

    if (
      commons.isRole('admin_company', user) ||
      commons.isRole('director', user)
    ) {
      filter.companyId = user.companyId._id;
      console.log('AccountManagement -> filter', filter);
    }
    API.getListUsers(dispatch, filter);
    // console.log('AccountManagement -> res', res);

    commons.wait(1000).then(() => {
      setState({...state, refreshing: false});
    });
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
  return (
    <>
      {state.refreshing && <LoadingView />}
      <FlatList
        data={allUsers}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return item.toString() + index.toString();
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
        style={{backgroundColor: 'white'}}
        ItemSeparatorComponent={SeparatorView}
        refreshControl={
          <RefreshControl refreshing={state.refreshing} onRefresh={onRefresh} />
        }
        removeClippedSubviews={true}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </>
  );
};

export default memo(AccountManagement);

const styles = StyleSheet.create({});
