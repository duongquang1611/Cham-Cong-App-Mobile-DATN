import {showAlert, TextView} from 'cc-components';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AppImages from '../../../../../assets/images';
import baseStyles from '../../../../baseStyles';
import commons from '../../../commons';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {appNavigate} from '../../../../navigations';

let row = [];
let prevOpenedRow = null;
const WIDTH_SWIPE = 70;

const RowInfoModal = (props) => {
  const {title, value} = props;
  return (
    <View style={styles.containerRowInfoModal}>
      <Text style={{width: '25%', color: 'grey'}}>{title}</Text>
      <Text style={{width: '70%', fontSize: commons.fontSize16}}>
        {value || commons.noData}
      </Text>
    </View>
  );
};
const ItemCompany = (props) => {
  const {item, index, deleteCompany, editCompany} = props;
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();
  const closeRow = (index) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };
  const onPressSwipeButton = async ({id, data}) => {
    closeRow(index + 1);
    switch (id) {
      case 'edit':
        editCompany(item);
        break;

      case 'delete':
        deleteCompany(item);
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
  const changeVisibleModal = () => {
    setIsVisible(!isVisible);
  };
  const navToDetailCompany = () => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'DetailCompany', {
      companyData: item,
    });
  };
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={changeVisibleModal}>
        <TouchableOpacity
          onPress={changeVisibleModal}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.4)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          activeOpacity={1}>
          <View
            style={{
              // height: 300,
              width: commons.widthPercent(90),
              backgroundColor: 'white',
              padding: commons.padding10,
              borderRadius: 10,
              alignItems: 'center',
            }}>
            <Text style={styles.textTitleModal}>Thông tin công ty</Text>
            <RowInfoModal title="Tên" value={item?.name} />
            <RowInfoModal title="Số điện thoại" value={item?.phoneNumber} />
            <RowInfoModal title="Email" value={item?.email} />
            <RowInfoModal title="Địa chỉ" value={item?.address} />
            <RowInfoModal title="Website" value={item?.website} />
            <RowInfoModal
              title="Người đại diện"
              value={item?.representativeName}
            />

            <RowInfoModal
              title="Cập nhật lần cuối"
              value={moment(item?.updatedAt).format(commons.FORMAT_DATE_VN)}
            />
          </View>
        </TouchableOpacity>
      </Modal>
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
            padding: 10,
            paddingHorizontal: 15,
          }}
          onPress={navToDetailCompany}
          // onPress={changeVisibleModal}
        >
          <Text style={{fontSize: commons.fontSize16}}>{item?.name}</Text>
          <TextView
            style={{marginTop: 5}}
            value={' ' + (item?.address || commons.noData)}
            nameIconLeft={'address-location'}
          />
        </TouchableOpacity>
      </Swipeable>
    </>
  );
};

export default ItemCompany;

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
  containerRowInfoModal: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexShrink: 1,
  },
  textTitleModal: {
    ...baseStyles.title,
    padding: 5,
    width: '100%',
    textAlign: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    marginBottom: 10,
  },
});
