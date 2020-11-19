import {showAlert, TextView} from 'cc-components';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppImages from '../../../../../assets/images';
import baseStyles from '../../../../baseStyles';
import commons from '../../../commons';

let row = [];
let prevOpenedRow = null;
const WIDTH_SWIPE = 70;

const ItemAccount = (props) => {
  const {item, index, deleteAccount, editAccount} = props;
  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };
  const onPressSwipeButton = async ({id, data}) => {
    switch (id) {
      case 'edit':
        editAccount(item);
        break;

      case 'delete':
        deleteAccount(item);
        break;

      default:
        break;
    }
  };

  const SwipeItem = () => {
    return (
      <View style={styles.containerSwipe}>
        <TextView
          id="edit"
          onPress={onPressSwipeButton}
          style={{...styles.buttonRight, backgroundColor: commons.PersianGreen}}
          nameIconLeft="edit"
          typeIconLeft="FontAwesome"
          colorIconLeft="white"
          sizeIconLeft={commons.sizeIcon24}
        />
        <View style={{backgroundColor: 'white', height: 0.5}}></View>
        <TextView
          id="delete"
          onPress={onPressSwipeButton}
          style={styles.buttonRight}
          nameIconLeft="trash"
          typeIconLeft="FontAwesome"
          colorIconLeft="white"
          sizeIconLeft={commons.sizeIcon24}
        />
      </View>
    );
  };
  return (
    <Swipeable
      ref={(ref) => (row[index] = ref)}
      friction={1.3}
      leftThreshold={WIDTH_SWIPE / 2}
      rightThreshold={WIDTH_SWIPE / 2}
      onSwipeableRightOpen={() => {
        // console.log('right open');
      }}
      onSwipeableWillOpen={() => closeRow(index)}
      overshootFriction={20}
      containerStyle={{
        marginBottom: commons.margin,
        // borderTopWidth: 1,
        // borderColor: commons.lightgrey,
      }}
      renderLeftActions={(progress, drag) => <SwipeItem />}
      renderRightActions={(progress, drag) => <SwipeItem />}>
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          minHeight: 60,
          flexDirection: 'row',
          padding: 10,
        }}>
        <Image
          source={
            item?.avatar && item?.avatar?.thumb200
              ? {uri: item?.avatar?.thumb200}
              : item && item?.gender && item?.gender == 0
              ? AppImages.female
              : AppImages.male
          }
          style={{
            height: 60,
            width: 60,
            borderRadius: 100,
          }}
          resizeMode="cover"
        />
        <View style={{marginLeft: 10}}>
          <Text style={styles.title}> {item?.username}</Text>
          <Text> {item?.name}</Text>
          <Text> {item?.roleId?.name}</Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default ItemAccount;

const styles = StyleSheet.create({
  ...baseStyles,
  buttonRight: {
    flex: 1,
    backgroundColor: commons.darkRedIOS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSwipe: {
    width: WIDTH_SWIPE,
  },
});
