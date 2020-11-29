import {HeaderView, TextView} from 'cc-components';
import React, {memo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import commons from '../commons';
let noData = 'Chưa có dữ liệu';
const viewSeparator = () => {
  return <View style={{height: 1, backgroundColor: '#F0F0F0'}} />;
};

const EmptyList = () => {
  return <Text style={styles.textEmpty}>{noData}</Text>;
};
let DEFAULT_HEIGHT_ADD = -50;
const CustomBottomSheet = (props) => {
  const {
    refBottomSheet,
    percentHeight,
    hideBottomSheet,
    onSelectedItem,
    titleSheet,
    dataSheet,
  } = props;

  const HeaderBottomSheet = () => {
    return (
      <HeaderView
        isToolbar={true}
        isStatusBar={false}
        titleScreen={titleSheet}
        styleTitle={{color: commons.colorMain, backgroundColor: 'transparent'}}
        styleHeader={{
          backgroundColor: commons.border,
        }}
        colorsLinearGradient={['white', 'white', 'white']}
        nameIconBack="clear"
        colorIconBack={commons.colorMain}
        onPressBack={hideBottomSheet}
        // renderToolbarBottom={
        //   typeParamChoose === TypeParams.Province && (
        //     <Text>render province suggest</Text>
        //   )
        // }
      />
    );
  };

  const renderItemSelect = ({item, index}) => {
    // let isChecked = isItemChecked(item, typeParamChoose);
    return (
      <TextView
        data={item}
        // nameIconRight={'icon-circle-correct'}
        // colorIconRight="green"
        onPress={onSelectedItem}
        style={{
          ...styles.styleContainerItemSheet,
          backgroundColor: 'transparent',
        }}
        styleText={{
          ...styles.itemSheet,
          fontWeight: 'normal',
        }}
        styleContainerText={styles.containerItemSheet}>
        {item.name}
      </TextView>
    );
  };
  const ContentBottomSheet = () => {
    return (
      <View style={{height: '100%'}}>
        <HeaderBottomSheet />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={dataSheet}
          scrollEnabled={true}
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={viewSeparator}
          style={{backgroundColor: 'white'}}
          contentContainerStyle={{
            justifyContent: 'center',
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItemSelect}
          removeClippedSubviews={true}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={10}
          ListEmptyComponent={EmptyList}
        />
      </View>
    );
  };
  return (
    <RBSheet
      ref={refBottomSheet}
      animationType="slide"
      height={percentHeight}
      onClose={hideBottomSheet}
      openDuration={250}
      // closeOnDragDown={true}
      closeOnPressBack={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          //   backgroundColor: 'transparent',
        },
        container: {
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          elevation: 10,
          height:
            commons.SCREEN_HEIGHT === percentHeight + DEFAULT_HEIGHT_ADD
              ? '100%'
              : percentHeight,
        },
      }}>
      <ContentBottomSheet />
    </RBSheet>
  );
};

export default memo(CustomBottomSheet);

const styles = StyleSheet.create({
  styleContainerItemSheet: {
    height: commons.heightDefault,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: commons.margin,
  },
  itemSheet: {
    fontSize: commons.fontSize16,
    fontWeight: '800',
  },
  containerItemSheet: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textEmpty: {
    textAlign: 'center',
    color: 'grey',
    fontSize: 14,
  },
});
