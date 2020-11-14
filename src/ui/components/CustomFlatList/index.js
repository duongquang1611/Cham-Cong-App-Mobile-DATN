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

  const EmptyList = () => {
    return (
      <Text style={{textAlign: 'center', marginTop: 10}}>Chưa có dữ liệu</Text>
    );
  };
  return (
    <FlatList
      ListHeaderComponent={renderHeader || null}
      // stickyHeaderIndices={[0]}
      showsVerticalScrollIndicator={false}
      data={data}
      extraData={data}
      automaticallyAdjustContentInsets={false}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
      removeClippedSubviews={true}
      style={{backgroundColor: 'white'}}
      initialNumToRender={10}
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
      onEndReachedThreshold={0.01}
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
