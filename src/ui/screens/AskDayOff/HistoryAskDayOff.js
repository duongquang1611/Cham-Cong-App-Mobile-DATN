import {useNavigation} from '@react-navigation/native';
import {
  CustomFlatList,
  LoadingView,
  CustomBottomSheet,
  TextView,
} from 'cc-components';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import API from '../../../networking';
import actions from '../../../redux/actions';
import commons from '../../commons';
import {SORT_DAY_OFF} from '../CATEGORIES';
import ItemHistoryAskDayOff from './Item';
import styles from './styles';

let onEndReachedCalledDuringMomentum = true;
let dataSheet = [];
let titleSheet = '';
let typeParamChoose = '';
let sortSelected = SORT_DAY_OFF[0];

const HistoryAskDayOff = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refBottomSheet = useRef();

  let userInfo = models.getUserInfo();

  const [state, setState] = useState({
    page: 0,
    refreshing: true,
    percentHeight: 0,
    data: [],
    // hasNext: true,
  });

  let filter = {
    userId: userInfo?._id,
    status: 0,
    sortType: sortSelected?.type,
    sortValue: sortSelected?.value,
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

  useEffect(() => {
    state.percentHeight > 0
      ? refBottomSheet.current.open()
      : refBottomSheet.current.close();
  }, [state.percentHeight]);

  const hideBottomSheet = () => {
    setState({...state, percentHeight: 0});
  };

  const setOnEndReachedCalledDuringMomentum = (value) => {
    onEndReachedCalledDuringMomentum = value;
  };

  const onRefresh = (newFilter = {}) => {
    dispatch(actions.changeListAskDayOff(false));
    filter = {
      userId: userInfo?._id,
      status: 0,
      sortType: sortSelected?.type,
      sortValue: sortSelected?.value,
      ...newFilter,
    };
    setState({
      ...state,
      page: 0,
      refreshing: true,
      percentHeight: 0,
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

  const onSelectedSort = ({id, data = []}) => {
    console.log({id, data});
    typeParamChoose = id;
    dataSheet = data;
    let isShowSheet = true;
    switch (id) {
      case 'sort': {
        titleSheet = 'Sắp xếp theo';
        dataSheet = SORT_DAY_OFF;
        break;
      }
      case 'filter': {
        titleSheet = 'Lọc';
        break;
      }

      default:
        break;
    }
    if (isShowSheet) {
      let allHeight = (dataSheet.length + 1) * commons.heightDefault;
      let height =
        allHeight < commons.SCREEN_HEIGHT ? allHeight : commons.SCREEN_HEIGHT;

      // console.log(allHeight, height);
      setState({...state, percentHeight: height + 50});
    }
  };

  const renderHeader = () => {
    return (
      <View style={styles.containerRenderHeader}>
        <TextView
          id="sort"
          typeIconLeft="MaterialCommunityIcons"
          nameIconLeft={
            commons.isEmptyObject(sortSelected)
              ? 'sort'
              : sortSelected?.value === 1
              ? 'sort-reverse-variant'
              : 'sort-variant'
          }
          style={{...styles.center}}
          colorIconLeft={commons.colorMain}
          sizeIconLeft={commons.sizeIcon24}
          onPress={onSelectedSort}
          styleText={{marginLeft: 5}}>
          {commons.isEmptyObject(sortSelected) ? 'Sắp xếp' : sortSelected?.name}
        </TextView>
      </View>
    );
  };
  const onSelectedItem = ({data}) => {
    // sortSelected
    // hideBottomSheet();
    switch (typeParamChoose) {
      case 'sort': {
        sortSelected = {...data};
        break;
      }
      case 'filter': {
        break;
      }

      default:
        break;
    }
    onRefresh();
  };

  return (
    <>
      {state.refreshing && <LoadingView />}
      <CustomFlatList
        stickyHeaderIndices={[0]}
        renderHeader={renderHeader}
        data={state?.data && state?.data.length > 0 ? state.data : []}
        renderItem={renderItem}
        refreshing={state.refreshing}
        changeOnEndReached={setOnEndReachedCalledDuringMomentum}
        showSeparator={false}
        contentContainerStyle={{
          backgroundColor: 'rgba(0,0,0,0.05)',
          // flex: 1,
          flexGrow: 1,
          paddingHorizontal: commons.margin,
        }}
        {...{
          onRefresh,
          handleLoadMore,
          onEndReachedCalledDuringMomentum,
        }}
      />
      <CustomBottomSheet
        {...{
          refBottomSheet,
          percentHeight: state.percentHeight,
          hideBottomSheet,
          onSelectedItem,
          titleSheet,
          dataSheet,
        }}
      />
    </>
  );
};

export default HistoryAskDayOff;
