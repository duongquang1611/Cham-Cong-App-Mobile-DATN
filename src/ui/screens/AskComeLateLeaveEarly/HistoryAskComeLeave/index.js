import {useNavigation} from '@react-navigation/native';
import {
  CustomFlatList,
  HeaderView,
  IconView,
  LoadingView,
  TextView,
  CustomBottomSheet,
} from 'cc-components';
import React, {useEffect, useState, useRef} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../../models';
import API from '../../../../networking';
import actions from '../../../../redux/actions';
import commons from '../../../commons';
import ItemHistoryAskComeLeave from './Item';
import RBSheet from 'react-native-raw-bottom-sheet';
import baseStyles from '../../../../baseStyles';
import {SORT_COME_LEAVE} from '../../CATEGORIES';

let onEndReachedCalledDuringMomentum = true;
let dataSheet = [];
let titleSheet = '';
let typeParamChoose = '';
let sortSelected = SORT_COME_LEAVE[0];

const HistoryAskComeLeaveTemplate = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refBottomSheet = useRef();

  let userInfo = models.getUserInfo();

  const [state, setState] = useState({
    page: 0,
    refreshing: true,
    data: [],
    percentHeight: 0,
    // hasNext: true,
  });

  let filter = {
    userId: userInfo?._id,
    comeLeave: true,
    sortType: sortSelected?.type,
    sortValue: sortSelected?.value,
  };

  const dayWorkReducer = useSelector((state) => state.dayWorkReducer);

  useEffect(() => {
    console.log(
      'page hasNext refreshing',
      state.page,
      // state.hasNext,
      state.refreshing,
    );
    state.refreshing && getData();
  }, [state]);

  useEffect(() => {
    dayWorkReducer?.changeListAskComeLeave && onRefresh();
  }, [dayWorkReducer?.changeListAskComeLeave]);

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
    dispatch(actions.changeListAskComeLeave(false));
    filter = {
      userId: userInfo?._id,
      comeLeave: true,
      sortType: sortSelected?.type,
      sortValue: sortSelected?.value,
      ...newFilter,
    };
    setState({
      ...state,
      page: 0,
      percentHeight: 0,
      refreshing: true,
      // hasNext: true,
    });
  };

  const getData = async (newFilter = filter) => {
    try {
      let res = await API.getDataListAskComeLeaveProcessed(
        dispatch,
        newFilter,
        state.page,
      );

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
      <ItemHistoryAskComeLeave {...{item, index}} style={{marginBottom: 10}} />
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
        dataSheet = SORT_COME_LEAVE;
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

  // const renderItemSelect = ({item, index}) => {
  //   // let isChecked = isItemChecked(item, typeParamChoose);
  //   return (
  //     <TextView
  //       data={item}
  //       // nameIconRight={'icon-circle-correct'}
  //       // colorIconRight="green"
  //       onPress={onSelectedItem}
  //       style={{
  //         ...styles.styleContainerItemSheet,
  //         backgroundColor: 'transparent',
  //       }}
  //       styleText={{
  //         ...styles.itemSheet,
  //         fontWeight: 'normal',
  //       }}
  //       styleContainerText={styles.containerItemSheet}>
  //       {item.name}
  //     </TextView>
  //   );
  // };

  // const HeaderBottomSheet = () => {
  //   return (
  //     <HeaderView
  //       isToolbar={true}
  //       isStatusBar={false}
  //       titleScreen={titleSheet}
  //       styleTitle={{color: commons.colorMain, backgroundColor: 'transparent'}}
  //       styleHeader={{
  //         backgroundColor: commons.border,
  //       }}
  //       colorsLinearGradient={['white', 'white', 'white']}
  //       nameIconBack="clear"
  //       colorIconBack={commons.colorMain}
  //       onPressBack={hideBottomSheet}
  //       // renderToolbarBottom={
  //       //   typeParamChoose === TypeParams.Province && (
  //       //     <Text>render province suggest</Text>
  //       //   )
  //       // }
  //     />
  //   );
  // };

  // const ContentBottomSheet = () => {
  //   return (
  //     <View style={{height: '100%'}}>
  //       <HeaderBottomSheet />
  //       <FlatList
  //         showsVerticalScrollIndicator={false}
  //         data={dataSheet}
  //         scrollEnabled
  //         automaticallyAdjustContentInsets={false}
  //         keyboardDismissMode="on-drag"
  //         keyboardShouldPersistTaps="handled"
  //        removeClippedSubviews={true}
  //    initialNumToRender={10}
  //    maxToRenderPerBatch={10}
  //    windowSize={10}
  //         ItemSeparatorComponent={viewSeparator}
  //         style={{backgroundColor: 'white'}}
  //         contentContainerStyle={{
  //           justifyContent: 'center',
  //         }}
  //         keyExtractor={(item, index) => index.toString()}
  //         renderItem={renderItemSelect}
  //       />
  //     </View>
  //   );
  // };

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
          // paddingTop: commons.margin5,
          paddingHorizontal: commons.margin,
        }}
        {...{
          onRefresh,
          handleLoadMore,
          onEndReachedCalledDuringMomentum,
        }}
      />
      {/* <RBSheet
        ref={refBottomSheet}
        animationType="slide"
        height={state.percentHeight}
        onClose={hideBottomSheet}
        openDuration={250}
        closeOnPressBack={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          container: {
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            elevation: 10,
          },
        }}>
        <ContentBottomSheet />
      </RBSheet> */}
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

export default HistoryAskComeLeaveTemplate;
const styles = StyleSheet.create({
  ...baseStyles,
});
