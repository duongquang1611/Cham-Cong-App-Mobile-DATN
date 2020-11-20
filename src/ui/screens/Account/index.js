import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState, useRef} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {
  HeaderMenuDrawer,
  IconView,
  InputView,
  TextView,
  NewPicker,
  LoadingView,
  showAlert,
} from 'cc-components';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from '@react-native-community/picker';
import ImageCropPicker from 'react-native-image-crop-picker';
import moment from 'moment';

import AppImages from '../../../../assets/images';
import baseStyles from '../../../baseStyles';
import models from '../../../models';
import API from '../../../networking';
import commons from '../../commons';
import actions from '../../../redux/actions';

// Nữ:0, Nam:1
const GENDER = [
  {id: 0, name: 'Nữ'},
  {id: 1, name: 'Nam'},
];

const CHOOSE_UPLOAD_IMAGE = [
  {
    id: 0,
    name: 'Chụp ảnh',
  },
  {
    id: 1,
    name: 'Chọn từ thư viện',
  },
];

const renderSeparator = () => {
  return <View style={{height: 1, backgroundColor: commons.border}} />;
};

const LabelView = (props) => {
  const {title = ''} = props;
  return (
    <Text
      style={{
        fontStyle: 'normal',
        fontSize: commons.fontSize16,
        fontWeight: 'bold',
      }}>
      {title}
    </Text>
  );
};
let newUserInfo = {};
const AccountScreen = (props) => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const {isLoginSuccess} = authReducer;
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [isVisibleDate, setIsVisibleDate] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  let userLocal = models.getUserInfo();
  // newUserInfo = {...userLocal};
  const [dataSheet, setDataSheet] = useState([]);

  const [userInfo, setUserInfo] = useState(userLocal);
  console.log('AccountScreen -> userInfo', userInfo?._id);
  const refBottomSheet = useRef();
  let refInput = {};
  const focusTheField = (id) => {
    refInput[id].focus();
  };

  const saveUserInApp = (data) => {
    models.saveUserInfoData(data);
    dispatch(actions.saveUserData(data));
    setUserInfo(data);
  };

  const onPressEdit = async () => {
    if (!isEditing) {
      setIsEditing(!isEditing);
    } else {
      // save update info
      setIsEditing(!isEditing);
      setIsLoading(true);
      try {
        let res = await API.PUT(API.detailUser(userLocal?._id), newUserInfo);
        setIsLoading(false);
        if (res && res._id) {
          saveUserInApp(res);
          showAlert({msg: 'Cập nhật thông tin thành công.'});
          newUserInfo = {};
        }
      } catch (error) {
        console.log('AccountScreen -> error', error);
        newUserInfo = {};
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    refreshing && getDetailUser(userInfo?._id);
  }, [refreshing]);

  useEffect(() => {
    if (dataSheet.length > 0) {
      refBottomSheet.current.open();
    }
  }, [dataSheet]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);
  const getDetailUser = async (id) => {
    try {
      let res = await API.GET(API.detailUser(id));
      setRefreshing(false);
      if (res && res._id) {
        saveUserInApp(res);
      }
    } catch (error) {
      setRefreshing(false);
      console.log('getDetailUser -> error', error);
    }
  };

  const HeaderInfoView = (props) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 100,
            ...styles.center,
            height: 100,
            width: 100,
            // overflow: 'hidden',
          }}>
          <Image
            source={
              userInfo?.avatar && userInfo?.avatar?.thumb500
                ? {uri: userInfo?.avatar?.thumb500}
                : userInfo && userInfo?.gender && userInfo?.gender == 0
                ? AppImages.female
                : AppImages.male
            }
            style={{
              height: 98,
              width: 98,
              borderRadius: 100,
            }}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.containerCamera2}
            onPress={() => setDataSheet(CHOOSE_UPLOAD_IMAGE)}>
            <IconView name="camera" color="white" size={15} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: commons.margin15,
            height: '100%',
            justifyContent: 'flex-start',
            flexShrink: 1,
          }}>
          <TextView
            styleValue={{
              color: 'white',
              fontSize: commons.fontSizeHeader,
              fontWeight: 'bold',
            }}
            style={{height: 30}}
            value={userInfo?.username}
          />
          <TextView
            styleValue={{
              color: 'white',
              fontSize: commons.fontSize,
              marginHorizontal: 8,
            }}
            style={{paddingBottom: 5}}
            // leftElement={
            //   <Image
            //     source={AppImages.role}
            //     style={{height: 17, width: 17}}
            //     tintColor="white"
            //   />
            // }
            nameIconLeft="icon-avatar-user"
            colorIconLeft="white"
            value={userInfo?.roleId?.name}
          />
          <TextView
            nameIconLeft="office"
            colorIconLeft="white"
            styleValue={{
              color: 'white',
              fontSize: commons.fontSize,
              fontWeight: 'bold',
              marginHorizontal: 8,
            }}
            value={userInfo?.companyId?.name || commons.noData}
          />
        </View>
      </View>
    );
  };
  const onPressDateOfBirth = () => {
    setIsVisibleDate(true);
  };

  const onChangeText = ({id, data}) => {
    newUserInfo[id] = data;
    console.log('onChangeText -> newUserInfo', newUserInfo);
  };
  const handleConfirm = (date) => {
    onChangeText({id: 'dateOfBirth', data: date});
    hidePicker();
  };
  const hidePicker = () => {
    setIsVisibleDate(false);
  };

  // upload image
  const handleUploadRNFetchBlob = async (image) => {
    // c1: success
    // let data = [];
    // data.push({
    //   name: 'file',
    //   type: image.mime,
    //   filename: image.path.substring(image.path.lastIndexOf('/') + 1),
    //   data: image.data,
    // });

    // let res = await API.uploadImageRNFetchBlob(data);
    // console.log('AccountScreen -> res', res);

    // c2: success
    const form = new FormData();

    form.append('file', {
      uri: image.path,
      type: image.mime,
      name: image.path.substring(image.path.lastIndexOf('/') + 1),
    });

    // let res = await API.uploadImage(dispatch, form); // upload image
    // console.log('AccountScreen -> res', res);
    // if (res && res.resize) {
    //   setUserInfo({...userInfo, avatar: res.resize});
    // }

    // upload image to update user
    let res = await API.PUT(API.detailUser(userLocal._id), form);
    if (res && res._id) {
      setUserInfo(res);
    }
  };

  const openCameraCapture = () => {
    ImageCropPicker.openCamera({
      width: commons.SCREEN_WIDTH,
      height: commons.SCREEN_HEIGHT,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        handleUploadRNFetchBlob(image);
      })
      .catch((e) => console.log(e));
  };

  const openImagePicker = () => {
    ImageCropPicker.openPicker({
      // multiple: true,
      mediaType: 'photo',
      includeBase64: true,
    })
      .then((image) => {
        handleUploadRNFetchBlob(image);
      })
      .catch((e) => console.log(e));
  };

  const handleChooseUploadImage = ({data}) => {
    refBottomSheet.current.close();
    // setDataSheet([]);
    switch (data) {
      case CHOOSE_UPLOAD_IMAGE[0]:
        openCameraCapture();
        break;
      case CHOOSE_UPLOAD_IMAGE[1]:
        openImagePicker();
        break;
      default:
        break;
    }
  };

  const renderItemChooseImage = ({item}) => {
    return (
      <TextView
        data={item}
        onPress={handleChooseUploadImage}
        style={{
          padding: commons.padding15,
          paddingHorizontal: commons.padding20,
          alignItems: 'center',
        }}
        nameIconLeft={item.id == 1 ? 'photograph' : 'camera'}
        typeIconLeft={'Fontisto'}
        colorIconLeft={'black'}
        sizeIconLeft={item.id == 1 ? commons.sizeIcon20 : commons.sizeIcon18}
        styleContainerText={{}}
        styleText={{
          fontSize: commons.fontSize16,
          fontWeight: 'bold',
          marginLeft: commons.margin,
        }}>
        {item.name}
      </TextView>
    );
  };
  const ContentBottomSheet = (props) => {
    return (
      <>
        <FlatList
          data={dataSheet}
          keyExtractor={(item, index) => item.toString() + index}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={renderSeparator}
          style={{backgroundColor: 'white'}}
          renderItem={renderItemChooseImage}
        />
      </>
    );
  };
  const handleInputVerify = ({id, data}) => {
    console.log('handleInputVerify -> id, data', id, data);
    switch (id) {
      case 'phoneNumber':
        return data.trim() == '' || commons.isValidPhoneNumber(data);
      case 'email':
        return data.trim() == '' || commons.isValidEmail(data);
      default:
        return true;
    }
  };
  return (
    <>
      <DateTimePickerModal
        mode={'date'}
        isVisible={isVisibleDate}
        date={
          newUserInfo?.dateOfBirth || userInfo?.dateOfBirth
            ? new Date(newUserInfo?.dateOfBirth || userInfo?.dateOfBirth)
            : new Date()
        }
        locale="vi"
        confirmTextIOS="Thay Đổi"
        cancelTextIOS="Hủy"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />

      <HeaderMenuDrawer
        titleScreen={'Thông tin người dùng'}
        nameMenuRight={isEditing ? 'content-save' : 'account-edit'}
        typeMenuRight="MaterialCommunityIcons"
        onPressMenuRight={onPressEdit}
        colorMenuRight="white"
        sizeMenuRight={commons.sizeIcon28}
        styleMenuRight={{marginRight: 5}}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <LinearGradient
          locations={[0, 0.2, 0.7]}
          colors={commons.colorsLinearGradient}
          style={{
            height: 150,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <HeaderInfoView />
        </LinearGradient>

        <View style={styles.containerInfoView}>
          {isLoading && <LoadingView />}
          <LabelView title={'Tên người dùng'} />
          <InputView
            id="name"
            ref={(input) => (refInput['name'] = input)}
            style={{
              // ...styles.containerInput,
              marginBottom: 15,
            }}
            onChangeText={onChangeText}
            colorTextDisable={'black'}
            // label={<LabelView title={'Tên người dùng'} />}
            placeholder="Nhập tên ..."
            value={userInfo?.name || commons.noData}
            styleContainer={{borderWidth: isEditing ? 0.5 : 0}}
            isShowClean={isEditing}
            returnKeyType="next"
            editable={isEditing}
            colorBorderDisable={commons.colorMain}
            onSubmitEditing={() => focusTheField('phoneNumber')}
          />
          <LabelView title={'Số điện thoại'} />
          <InputView
            id="phoneNumber"
            ref={(input) => (refInput['phoneNumber'] = input)}
            style={{
              // ...styles.containerInput,
              marginBottom: 15,
            }}
            onChangeText={onChangeText}
            handleInputVerify={handleInputVerify}
            textError={'Số điện thoại không hợp lệ.'}
            colorTextDisable={'black'}
            // label={<LabelView title={'Số điện thoại'} />}
            placeholder="Nhập số điện thoại ..."
            value={userInfo?.phoneNumber || commons.noData}
            styleContainer={{borderWidth: isEditing ? 0.5 : 0}}
            isShowClean={isEditing}
            colorBorderDisable={commons.colorMain}
            returnKeyType="next"
            editable={isEditing}
          />
          <InputView
            id="manager"
            style={{
              ...styles.containerInput,
            }}
            colorTextDisable={'black'}
            value={userInfo?.parentId?.name || commons.noData}
            label={<LabelView title={'Quản lý trực tiếp'} />}
            isShowClean={false}
            styleContainer={{borderWidth: 0}}
            editable={false}
          />
          <LabelView title={'Email'} />
          <InputView
            id="email"
            ref={(input) => (refInput['email'] = input)}
            style={{
              // ...styles.containerInput,
              marginBottom: 15,
            }}
            onChangeText={onChangeText}
            handleInputVerify={handleInputVerify}
            textError={'Email không hợp lệ.'}
            colorTextDisable={'black'}
            // label={<LabelView title={'Email'} />}
            placeholder="Nhập email ..."
            value={userInfo?.email || commons.noData}
            styleContainer={{borderWidth: isEditing ? 0.5 : 0}}
            isShowClean={isEditing}
            colorBorderDisable={commons.colorMain}
            returnKeyType="next"
            editable={isEditing}
          />
          <LabelView title={'Ngày sinh'} />
          <InputView
            id="dateOfBirth"
            ref={(input) => (refInput['dateOfBirth'] = input)}
            style={{
              // ...styles.containerInput,
              marginBottom: 15,
            }}
            colorTextDisable={'black'}
            // label={<LabelView title={'Ngày sinh'} />}
            onPressText={isEditing && onPressDateOfBirth}
            placeholder="Nhập ngày sinh ..."
            value={
              newUserInfo?.dateOfBirth || userInfo?.dateOfBirth
                ? moment(
                    newUserInfo?.dateOfBirth || userInfo?.dateOfBirth,
                  ).format(commons.FORMAT_DATE_VN)
                : commons.noData
            }
            styleContainer={{borderWidth: isEditing ? 0.5 : 0}}
            isShowClean={false}
            colorBorderDisable={commons.colorMain}
            returnKeyType="next"
            editable={isEditing && false}
          />
          <LabelView title={'Giới tính'} />
          {/* {isEditing ? ( */}
          <View
            style={{
              ...styles.containerPickerGender,
              borderWidth: isEditing ? 0.65 : 0,
            }}>
            <NewPicker
              data={GENDER}
              style={{
                width: '100%',
              }}
              enabled={isEditing}
              selectedValue={GENDER.find((item) => item.id == userInfo?.gender)}
              onValueChange={(itemValue, itemIndex) => {
                onChangeText({id: 'gender', data: itemValue.id});
                setUserInfo({...userInfo, gender: itemValue.id});
              }}
            />
          </View>

          <InputView
            id="createdAt"
            style={{
              ...styles.containerInput,
            }}
            colorTextDisable={'black'}
            value={
              moment(userInfo?.createdAt).format('DD-MM-YYYY') || commons.noData
            }
            label={<LabelView title={'Ngày tạo'} />}
            isShowClean={false}
            styleContainer={{borderWidth: 0}}
            editable={false}
          />
          <InputView
            id="updatedAt"
            style={{
              ...styles.containerInput,
            }}
            colorTextDisable={'black'}
            value={
              moment(userInfo?.updatedAt).format('DD-MM-YYYY') || commons.noData
            }
            label={<LabelView title={'Cập nhật lần cuối'} />}
            isShowClean={false}
            styleContainer={{borderWidth: 0}}
            editable={false}
          />
        </View>
        <RBSheet
          ref={refBottomSheet}
          animationType="fade"
          height={
            (CHOOSE_UPLOAD_IMAGE.length + 1) * (commons.heightHeader + 10)
          }
          onClose={() => setDataSheet([])}
          openDuration={200}
          closeOnPressMask={true}
          closeOnDragDown={true}
          closeOnPressBack={false}
          customStyles={{
            container: {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            },
          }}>
          <ContentBottomSheet />
        </RBSheet>
      </ScrollView>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  ...baseStyles,
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  containerInput: {
    marginVertical: commons.margin15,
  },
  containerCamera: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    bottom: 0,
    height: '40%',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCamera2: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    bottom: 0,
    right: -5,
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    padding: 8,
  },
  containerPickerGender: {
    borderColor: commons.colorMain,
    marginBottom: 15,
    borderRadius: commons.borderRadius4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInfoView: {
    backgroundColor: 'white',
    // elevation: 2,
    marginTop: -30,
    marginHorizontal: commons.margin20,
    paddingHorizontal: commons.padding15,
    borderRadius: 8,
    marginBottom: 10,
    paddingTop: 25,
  },
});
