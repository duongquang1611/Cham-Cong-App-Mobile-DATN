import {HeaderMenuDrawer, CustomFlatList} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import commons from '../../../commons';
import models from '../../../../models';
import API from '../../../../networking';
import {getParamsRequest} from '../../../components/CustomFlatList/getParamsRequest';
import ItemHistoryAskComeLeave from './Item';
import actions from '../../../../redux/actions';

let onEndReachedCalledDuringMomentum = true;

const HistoryAskComeLate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let type = 'comeLateAsk';

  let userInfo = models.getUserInfo();

  const [state, setState] = useState({
    page: 0,
    refreshing: true,
    data: [],
    hasNext: true,
  });

  let filterAsk = {
    userId: userInfo?._id,
    comeLeave: true,
  };

  useEffect(() => {
    console.log(
      'page hasNext refreshing',
      state.page,
      state.hasNext,
      state.refreshing,
    );
    state.refreshing && getData();
  }, [state]);

  const setOnEndReachedCalledDuringMomentum = (value) => {
    onEndReachedCalledDuringMomentum = value;
  };

  const onRefresh = (newParam) => {
    filterAsk = {
      userId: userInfo?._id,
      comeLeave: true,
    };
    setState({
      ...state,
      page: 0,
      refreshing: true,
      hasNext: true,
    });
  };

  const getData = async (filter = filterAsk) => {
    try {
      let res = await API.getDataListAskComeLeave(
        dispatch,
        filterAsk,
        state.page,
      );

      setState({
        ...state,
        data: state.page == 0 ? res : state.data.concat(res),
        hasNext: res.length == commons.NUMBER_ITEM_PAGE_DEFAULT,
        refreshing: false,
      });
    } catch (error) {
      setState({
        ...state,
        refreshing: false,
        hasNext: false,
      });
    }
  };
  const handleLoadMore = async () => {
    console.log(
      'Load more: CallingDuring hasNext',
      onEndReachedCalledDuringMomentum,
      state.hasNext,
    );
    if (!onEndReachedCalledDuringMomentum && state.hasNext) {
      setState({
        ...state,
        refreshing: true,
        page: state.page + 1,
      });
      onEndReachedCalledDuringMomentum = true;
    }
  };
  const renderItem = ({item, index}) => {
    return (
      <ItemHistoryAskComeLeave
        {...{item, index}}
        style={{marginBottom: 10}}
        type={type}
      />
    );
  };
  return (
    <>
      <CustomFlatList
        data={
          state.data.length > 0
            ? state.data.filter((item) => {
                return item[type].time != null;
              })
            : []
        }
        renderItem={renderItem}
        refreshing={state.refreshing}
        changeOnEndReached={setOnEndReachedCalledDuringMomentum}
        showSeparator={false}
        contentContainerStyle={{
          backgroundColor: 'rgba(0,0,0,0.05)',
          // flex: 1,
          flexGrow: 1,
          paddingTop: commons.margin5,
          paddingHorizontal: commons.margin,
        }}
        {...{
          onRefresh,
          handleLoadMore,
          onEndReachedCalledDuringMomentum,
        }}
      />
    </>
  );
};

export default HistoryAskComeLate;
