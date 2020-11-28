import {HeaderView, TextView} from 'cc-components';
import React, {memo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import commons from '../commons';

const viewSeparator = () => {
  return <View style={{height: 1, backgroundColor: '#F0F0F0'}} />;
};

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
          scrollEnabled
          automaticallyAdjustContentInsets={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={false}
          ItemSeparatorComponent={viewSeparator}
          style={{backgroundColor: 'white'}}
          contentContainerStyle={{
            justifyContent: 'center',
          }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItemSelect}
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
});
