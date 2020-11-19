import {showAlert} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import models from '../../../../models';
import API from '../../../../networking';
import commons from '../../../commons';
import ItemCompany from './ItemCompany';
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

const CompanyManagement = () => {
  const authReducer = useSelector((state) => state.authReducer);
  const [state, setState] = useState({
    allCompanies: [],
    refreshing: true,
  });

  useEffect(() => {
    state.refreshing && getData();
  }, [state.refreshing]);

  const getData = async () => {
    let res = await API.GET(API.searchCompanies);
    if (res && res.length > 0) {
      setState({...state, allCompanies: res, refreshing: false});
    } else {
      setState({...state, refreshing: false});
    }
  };

  const deleteCompany = async (item) => {
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
  };
  const editCompany = async (userId) => {
    // let res = await API.DELETE(API.detailUser(userId));
  };

  const renderItem = ({item, index}) => {
    return (
      <ItemCompany
        item={item}
        index={index}
        {...{deleteCompany, editCompany}}
      />
    );
  };
  const onRefresh = () => {
    setState({...state, refreshing: true});
  };
  return (
    <FlatList
      data={state.allCompanies}
      renderItem={renderItem}
      keyExtractor={(item, index) => {
        return index.toString();
      }}
      extraData={state.allCompanies}
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
    //   data={state.allCompanies}
    //   renderItem={renderItem}
    // />
  );
};

export default CompanyManagement;

const styles = StyleSheet.create({});
