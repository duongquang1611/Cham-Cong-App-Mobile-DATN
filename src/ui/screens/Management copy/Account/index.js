import {useNavigation} from '@react-navigation/native';
import {InputView, LoadingView, showAlert} from 'cc-components';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../../models';
import {appNavigate} from '../../../../navigations';
import API from '../../../../networking';
import actions from '../../../../redux/actions';
import commons from '../../../commons';
import ItemAccount from './ItemAccount';
let text = '';

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
let sort = {sortType: 'updatedAt', sortValue: -1};

const AccountManagement = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const {userData} = authReducer;
  const navigation = useNavigation();
  const companyReducer = useSelector((state) => state.companyReducer);
  const searchReducer = useSelector((state) => state.searchReducer);
  const commonReducer = useSelector((state) => state.commonReducer);
  let user = models.getUserInfo();
  let isAdminSystem = commons.isRole('admin_system', user);
  let isAdminCompanyOrDirector =
    commons.isRole('admin_company', user) || commons.isRole('director', user);

  console.log({searchReducer, commonReducer});
  const {allUsers} = companyReducer;
  const [state, setState] = useState({
    refreshing: false,
    isLoading: false,
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
    if (isAdminCompanyOrDirector || user?.companyId?._id) {
      filter.companyId = user?.companyId?._id;
      console.log('AccountManagement -> filter', filter);
    }
    API.getListUsers(dispatch, {...filter, ...sort});
    // console.log('AccountManagement -> res', res);

    commons.wait(1000).then(() => {
      setState({...state, refreshing: false});
    });
  };

  const deleteAccount = useCallback(async (item) => {
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
  }, []);
  const editAccount = useCallback((item) => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'EditAccount', {
      data: item,
    });
  }, []);

  const handleUploadRNFetchBlob = async (image, userId) => {
    setState({...state, isLoading: true});
    console.log({userId});
    const form = new FormData();
    try {
      form.append('file', {
        uri: image.path,
        type: image.mime,
        name: image.path.substring(image.path.lastIndexOf('/') + 1),
      });
      // upload image to add face user
      let res = await API.POST(API.addFace(userId), form);
      if (res && res.msg) {
        setState({...state, isLoading: false});
        showAlert({msg: res.msg});
      } else {
        setState({...state, isLoading: false});
      }
    } catch (error) {
      setState({...state, isLoading: false});
      console.log('handleUploadRNFetchBlob ~ error', error);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <ItemAccount
        item={item}
        index={index}
        showUpdateFace={isAdminCompanyOrDirector}
        {...{deleteAccount, editAccount, handleUploadRNFetchBlob}}
      />
    );
  };

  const onPressIconSearch = () => {
    console.log({text, user: 'user'});
    dispatch(actions.saveSearchUser(text));
  };

  const onSubmitSearchText = ({nativeEvent}) => {
    text = nativeEvent.text;
    onPressIconSearch();
  };
  const onChangeTextSearch = ({id, data}) => {
    text = data;
  };

  return (
    <>
      <HeaderMenuDrawer
        // titleScreen={'Quản lý'}
        titleScreen={''}
        rightElement={
          <InputView
            id="search_text"
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 100,
              borderWidth: 0,
            }}
            styleContainerInput={{borderWidth: 0, paddingHorizontal: 5}}
            // onChangeText={onChangeTextSearch}
            placeholder={'Nhập thông tin tìm kiếm ...'}
            iconLeft="search"
            typeIconLeft="FontAwesome"
            // colorIconLeft={commons.colorMain}
            onPressIconLeft={onPressIconSearch}
            onChangeText={onChangeTextSearch}
            sizeIconLeft={commons.sizeIcon20}
            returnKeyType="search"
            onSubmitEditing={onSubmitSearchText}
          />
        }
      />

      {state.refreshing && <LoadingView />}
      {state.isLoading && <LoadingView />}
      <Provider>
        <FlatList
          data={allUsers}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            // return item.toString() + index.toString();
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
          style={{backgroundColor: 'white'}}
          ItemSeparatorComponent={SeparatorView}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={onRefresh}
            />
          }
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
        <Portal>
          <ButtonPlusFAB />
        </Portal>
      </Provider>
    </>
  );
};

export default memo(AccountManagement);

const styles = StyleSheet.create({});
