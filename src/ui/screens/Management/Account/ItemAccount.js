import {IconView, LoadingView, showAlert, TextView} from 'cc-components';
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
import ImageCropPicker from 'react-native-image-crop-picker';
import API from '../../../../networking';

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
const ItemAccount = (props) => {
  const {
    item,
    index,
    deleteAccount,
    editAccount,
    handleUploadRNFetchBlob,
    showUpdateFace = false,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
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
  const changeVisibleModal = () => {
    setIsVisible(!isVisible);
  };

  const openCameraCapture = () => {
    ImageCropPicker.openCamera({
      // width: commons.SCREEN_WIDTH,
      // height: commons.SCREEN_HEIGHT,
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: false,
    })
      .then((image) => {
        handleUploadRNFetchBlob(image, item._id);
      })
      .catch((e) => console.log(e));
  };

  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      // multiple: true,
      mediaType: 'photo',
      // includeBase64: true,
    })
      .then((image) => {
        handleUploadRNFetchBlob(image, item._id);
      })
      .catch((e) => console.log(e));
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
            <Text style={styles.textTitleModal}>Thông tin tài khoản</Text>
            <RowInfoModal title="Tài khoản" value={item?.username} />
            <RowInfoModal title="Tên" value={item?.name} />
            <RowInfoModal title="Chức vụ" value={item?.roleId?.name} />
            <RowInfoModal
              title="Quản lý trực tiếp"
              value={item?.parentId?.name}
            />
            <RowInfoModal title="Công ty" value={item?.companyId?.name} />
            <RowInfoModal title="Số điện thoại" value={item?.phoneNumber} />
            <RowInfoModal title="Địa chỉ" value={item?.address} />
            <RowInfoModal title="Email" value={item?.email} />
            <RowInfoModal
              title="Giới tính"
              value={item?.gender ? (item?.gender == 1 ? 'Nam' : 'Nữ') : ''}
            />
            <RowInfoModal
              title="Ngày sinh"
              value={
                item?.dateOfBirth
                  ? moment(item?.dateOfBirth).format(commons.FORMAT_DATE_VN)
                  : ''
              }
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
            flexDirection: 'row',
            padding: 10,
            justifyContent: 'space-between',
          }}
          onPress={changeVisibleModal}>
          <View style={{flexDirection: 'row'}}>
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
            <View style={{marginLeft: 15}}>
              <Text style={styles.title}>{item?.username}</Text>
              <Text>{item?.name}</Text>
              <Text>{item?.roleId?.name}</Text>
            </View>
          </View>
          {showUpdateFace && (
            <TextView
              onPress={openCameraCapture}
              // onPress={openImagePicker}
              id={'face_recognition'}
              data={item}
              style={{...styles.center}}
              centerElement={
                <Image
                  source={AppImages.face_recognition}
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  resizeMode="cover"
                />
              }></TextView>
          )}
        </TouchableOpacity>
      </Swipeable>
    </>
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
  containerRowInfoModal: {
    padding: 5,
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
