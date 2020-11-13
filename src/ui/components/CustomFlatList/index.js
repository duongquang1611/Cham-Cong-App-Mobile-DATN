import React from 'react';
import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import renderFooter from './renderFooter';
import SeparatorView from './SeparatorView';
import getParamsRequest from './getParamsRequest';
import commons from '../../commons';

const CustomFlatList = (props) => {
  const {
    renderHeader,
    data,
    changeOnEndReached,
    refreshing,
    onRefresh,
    handleLoadMore,
    renderItem,
    onEndReachedCalledDuringMomentum,
    showSeparator = true,
  } = props;
  console.log('CustomFlatList -> renderItem', renderItem);
  // const renderItem = ({item, index}) => {
  //   console.log('renderItem -> item', index);
  //   return <Text>{index}</Text>;
  // };
  const EmptyList = () => {
    return (
      <Text style={{textAlign: 'center', marginTop: 10}}>Chưa có dữ liệu</Text>
    );
  };
  return (
    <FlatList
      ListHeaderComponent={renderHeader || null}
      stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      data={data}
      extraData={data}
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      removeClippedSubviews={true}
      style={{backgroundColor: 'white'}}
      contentContainerStyle={{
        flex: 1,
        // backgroundColor: 'lightgray',
        // justifyContent: 'center',
        paddingTop: commons.margin5,
        paddingHorizontal: commons.margin,
      }}
      {...props}
      ListEmptyComponent={EmptyList}
      keyExtractor={(item, index) => {
        return index.toString();
      }}
      renderItem={renderItem}
      ItemSeparatorComponent={showSeparator && SeparatorView}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      onMomentumScrollBegin={() => changeOnEndReached(false)}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={() =>
        renderFooter(!onEndReachedCalledDuringMomentum)
      }
    />
  );
};

export default CustomFlatList;

const styles = StyleSheet.create({});
