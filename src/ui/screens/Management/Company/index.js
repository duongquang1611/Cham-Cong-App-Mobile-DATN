import {useNavigation} from '@react-navigation/native';
import {
  HeaderMenuDrawer,
  InputView,
  LoadingView,
  showAlert,
} from 'cc-components';
import React, {memo, useCallback, useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../../models';
import {appNavigate} from '../../../../navigations';
import API from '../../../../networking';
import commons from '../../../commons';
import ItemCompany from './ItemCompany';
import {Portal, Provider} from 'react-native-paper';
import ButtonPlusFAB from './../ButtonPlusFAB';
import {TypeTabManagement} from '../TypeTabManagement';
import actions from '../../../../redux/actions';
import {Keyboard} from 'react-native';
let text = '';

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

let filter = {};
const CompanyManagement = () => {
  const companyReducer = useSelector((state) => state.companyReducer);
  const searchReducer = useSelector((state) => state.searchReducer);

  const {allCompanies} = companyReducer;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [state, setState] = useState({
    refreshing: true,
  });
  const getData = async () => {
    commons.wait(1000).then(() => {
      setState({...state, refreshing: false});
    });
    API.getListCompanies(dispatch, filter);
  };

  useEffect(() => {
    state.refreshing && getData();
  }, [state.refreshing]);

  const onRefresh = (clearText = false) => {
    if (clearText) filter = {};
    setState({...state, refreshing: true});
  };

  useEffect(() => {
    if (
      searchReducer.textSearchCompany &&
      searchReducer.textSearchCompany.trim().length !== 0
    ) {
      console.log('search');
      filter.text = searchReducer.textSearchCompany;
      onRefresh();
    } else {
      onRefresh(true);
    }
  }, [searchReducer.textSearchCompany]);

  const deleteCompany = useCallback(async (item) => {
    const onPressDeleteCompany = async () => {
      try {
        let res = await API.DELETE(API.detailCompany(item._id));
        if (res && res.msg) {
          showAlert({msg: res.msg});
          onRefresh();
        }
      } catch (error) {
        console.log('CompanyManagement -> error', error);
      }
    };
    showAlert({
      msg: `Xác nhận xóa công ty ${item.name} ?`,
      showCancel: true,
      onPressOK: onPressDeleteCompany,
    });
  }, []);
  const editCompany = useCallback((item) => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'EditCompany', {
      data: item,
    });
  }, []);

  const navToDetailCompany = useCallback((item) => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'DetailCompany', {
      companyData: item,
    });
  }, []);
  const renderItem = ({item, index}) => {
    return (
      <ItemCompany
        item={item}
        index={index}
        {...{deleteCompany, editCompany, navToDetailCompany}}
      />
    );
  };
  const onPressIconSearch = () => {
    console.log({text, user: 'company'});
    Keyboard.dismiss();
    dispatch(actions.saveSearchCompany(text));
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
            placeholder={'Nhập thông tin tìm kiếm người dùng...'}
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

      <Provider>
        {state.refreshing && <LoadingView />}
        <FlatList
          data={allCompanies}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            // return item.toString() + index.toString();
            return index.toString();
          }}
          extraData={allCompanies}
          contentContainerStyle={{
            paddingTop: commons.margin5,
            paddingHorizontal: commons.margin,
          }}
          ItemSeparatorComponent={SeparatorView}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={onRefresh}
            />
          }
          ListEmptyComponent={EmptyList}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          style={{backgroundColor: 'white'}}
          initialNumToRender={10}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
        />
        <Portal>
          <ButtonPlusFAB typeTab={TypeTabManagement.company} />
        </Portal>
      </Provider>
    </>
  );
};

export default memo(CompanyManagement);

const styles = StyleSheet.create({});
