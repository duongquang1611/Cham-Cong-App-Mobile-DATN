import {useNavigation} from '@react-navigation/native';
import {CustomFlatList, LoadingView} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import API from '../../../networking';
import actions from '../../../redux/actions';
import commons from '../../commons';
import ItemHistoryAskDayOff from './Item';

let onEndReachedCalledDuringMomentum = true;

const HistoryAskDayOff = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  let userInfo = models.getUserInfo();

  const [state, setState] = useState({
    page: 0,
    refreshing: true,
    data: [],
    // hasNext: true,
  });

  let filter = {
    userId: userInfo?._id,
    status: 0,
  };

  const dayWorkReducer = useSelector((state) => state.dayWorkReducer);

  useEffect(() => {
    console.log(
      // 'page hasNext refreshing',
      'page refreshing',
      state.page,
      // state.hasNext,
      state.refreshing,
    );
    state.refreshing && getData();
  }, [state]);

  useEffect(() => {
    dayWorkReducer?.changeListAskDayOff && onRefresh();
  }, [dayWorkReducer?.changeListAskDayOff]);

  const setOnEndReachedCalledDuringMomentum = (value) => {
    onEndReachedCalledDuringMomentum = value;
  };

  const onRefresh = (newFilter = {}) => {
    dispatch(actions.changeListAskDayOff(false));
    filter = {
      userId: userInfo?._id,
      status: 0,
      ...newFilter,
    };
    setState({
      ...state,
      page: 0,
      refreshing: true,
      // hasNext: true,
    });
  };

  const getData = async (newFilter = filter) => {
    try {
      let res = await API.getDataListDayOff(dispatch, newFilter, state.page);

      setState({
        ...state,
        data: state.page == 0 ? res : state.data.concat(res),
        // hasNext: res.length == commons.NUMBER_ITEM_PAGE_DEFAULT,
        refreshing: false,
      });
    } catch (error) {
      setState({
        ...state,
        refreshing: false,
        // hasNext: false,
      });
    }
  };
  const handleLoadMore = async () => {
    console.log(
      'Load more: CallingDuring hasNext',
      onEndReachedCalledDuringMomentum,
      // state.hasNext,
    );
    // if (!onEndReachedCalledDuringMomentum && state.hasNext) {
    if (!onEndReachedCalledDuringMomentum) {
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
      <ItemHistoryAskDayOff {...{item, index}} style={{marginBottom: 10}} />
    );
  };
  return (
    <>
      {state.refreshing && <LoadingView />}
      <CustomFlatList
        data={state?.data && state?.data.length > 0 ? state.data : []}
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

export default HistoryAskDayOff;
