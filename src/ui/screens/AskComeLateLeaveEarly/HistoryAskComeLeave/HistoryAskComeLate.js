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

const HistoryAskComeLate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let type = 'comeLateAsk';
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  let userInfo = models.getUserInfo();
  const [state, setState] = useState({
    page: 0,
    refreshing: false,
    data: [],
  });

  const dayWorkReducer = useSelector((state) => state.dayWorkReducer);

  let {listAskComeLeave = []} = dayWorkReducer;
  console.log(
    'HistoryAskComeLate -> listAskComeLeave',
    listAskComeLeave.length,
  );

  let filterAskComeLate = {
    userId: userInfo?._id,
    comeLeave: true,
  };
  useEffect(() => {
    state.refreshing && getData();
  }, [state]);
  useEffect(() => {
    getData(filterAskComeLate, state.page);
  }, [state.page]);

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

  const getData = async (filter = filterAskComeLate, page) => {
    dispatch(actions.changeListAskComeLeave(false));
    commons.wait(2000).then(() => setState({...state, refreshing: false}));
    API.getListAskComeLeave(
      dispatch,
      filterAskComeLate,
      listAskComeLeave,
      page,
    );
  };
  const handleLoadMore = async () => {
    console.log('handleLoadMore', state.page);
    if (!onEndReachedCalledDuringMomentum || state.page === 0) {
      setOnEndReachedCalledDuringMomentum(true);
      try {
        setState({
          ...state,
          page: state.page + 1,
        });
      } catch (error) {
        console.log('loadmore -> error', error);
      }
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
      {/* {state.data.length > 0 ? ( */}
      <CustomFlatList
        data={
          listAskComeLeave.length > 0
            ? listAskComeLeave.filter((item) => {
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
      {/* ) : (
        <Text style={{textAlign: 'center', marginTop: 10}}>
          Chưa có dữ liệu
        </Text>
      )} */}
    </>
  );
};

export default HistoryAskComeLate;
