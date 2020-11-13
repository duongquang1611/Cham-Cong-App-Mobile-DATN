import {HeaderMenuDrawer, CustomFlatList} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import commons from '../../commons';
import styles from './styles';
import API from '../../../networking';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import models from '../../../models';
import {getParamsRequest} from '../../components/CustomFlatList/getParamsRequest';
import ItemHistoryAskComeLate from './ItemHistoryAskComeLeave';

const HistoryAskComeLeave = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  let userInfo = models.getUserInfo();
  const [state, setState] = useState({
    page: 0,
    refreshing: true,
    data: [],
  });

  let filterAskComeLate = {
    userId: userInfo?._id,
    comeLeave: true,
  };
  useEffect(() => {
    state.refreshing && getDataOnRefresh();
  }, [state]);

  const onRefresh = (newParam) => {
    // if (newParam) {
    //   filterGlobal = {...filterGlobal, ...newParam};
    // }
    // console.log('onRefresh -> filterGlobal', filterGlobal);
    setState({
      ...state,
      page: 0,
      refreshing: true,
    });
  };

  const getDataOnRefresh = async () => {
    console.log('get Data on refresh');
    try {
      let res = await API.GET(
        API.workDay,
        getParamsRequest(
          state.page,
          commons.NUMBER_ITEM_PAGE_DEFAULT,
          filterAskComeLate,
          // SORT,
        ),
      );

      // console.log('res', res);

      console.log('check', Array.isArray(res) && res.length === 0);
      if (Array.isArray(res) && res.length === 0) {
        console.log('invalid');
        setOnEndReachedCalledDuringMomentum(false);
        setState({
          page: state.page,
          refreshing: false,
          data: [],
        });
        return;
      }
      console.log('valid', res.length);
      setState({
        page: state.page,
        refreshing: false,
        data: res,
      });
    } catch (error) {
      console.log('HistoryAskComeLeave -> error', error);
      setState({
        ...state,
        refreshing: false,
      });
    }
  };
  const handleLoadMore = async () => {
    console.log('handleLoadMore');
    if (!onEndReachedCalledDuringMomentum || state.page === 0) {
      setOnEndReachedCalledDuringMomentum(true);
      try {
        let res = await API.GET(
          API.workDay,
          getParamsRequest(
            state.page + 1,
            commons.NUMBER_ITEM_PAGE_DEFAULT,
            filterAskComeLate,
            // SORT,
          ),
        );

        if (Array.isArray(res) && res.length === 0) {
          // neu khong co du lieu
          return;
        }
        setState({
          page: state.page + 1,
          data: state.data.concat(res),
          refreshing: state.refreshing,
        });
      } catch (error) {
        console.log('loadmore -> error', error);
      }
    }
  };

  const renderItem = ({item, index}) => {
    return <ItemHistoryAskComeLate item={item} style={{marginBottom: 10}} />;
  };
  return (
    <>
      {state.data.length > 0 && (
        <View style={{flex: 1}}>
          <CustomFlatList
            data={state.data}
            renderItem={renderItem}
            refreshing={state.refreshing}
            changeOnEndReached={setOnEndReachedCalledDuringMomentum}
            showSeparator={false}
            contentContainerStyle={{
              backgroundColor: 'rgba(0,0,0,0.05)',
              // flex: 1,
              flexGroup: 1,
              paddingTop: commons.margin5,
              paddingHorizontal: commons.margin,
            }}
            {...{
              onRefresh,
              handleLoadMore,
              onEndReachedCalledDuringMomentum,
            }}
          />
        </View>
      )}
    </>
  );
};

export default HistoryAskComeLeave;
