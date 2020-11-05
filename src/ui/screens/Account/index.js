import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import AppImages from '../../../../assets/images';
import baseStyles from '../../../baseStyles';
import models from '../../../models';
import {GET} from '../../../networking';
import urlAPI from '../../../networking/urlAPI';
import commons from '../../commons';
import {Picker} from '@react-native-community/picker';
import {
  HeaderMenuDrawer,
  IconView,
  InputView,
  TextView,
  NewPicker,
} from '../../components';
import moment from 'moment';

// Nữ:0, Nam:1
const GENDER = [
  {id: 0, name: 'Nữ'},
  {id: 1, name: 'Nam'},
];
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
let noData = 'Chưa có thông tin';
const AccountScreen = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const {isLoginSuccess} = authReducer;
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  let userLocal = models.getUserInfo();
  const [userInfo, setUserInfo] = useState(userLocal);
  console.log('AccountScreen -> userInfo', userInfo?._id);
  let refInput = {};
  const focusTheField = (id) => {
    refInput[id].focus();
  };
  const onPressEdit = () => {
    if (!isEditing) {
      setIsEditing(!isEditing);
    } else {
      setIsEditing(!isEditing);
    }
  };

  useEffect(() => {
    getDetailUser(userInfo?._id);
  }, []);

  const getDetailUser = async (id) => {
    try {
      let res = await GET(urlAPI.detailUser(id));
      setUserInfo(res);
    } catch (error) {
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
            overflow: 'hidden',
          }}>
          <Image
            source={AppImages.bg_app}
            style={{
              height: 100,
              width: 100,
            }}
            resizeMode="cover"
          />
          <View style={styles.containerCamera}>
            <IconView name="camera" color="white" />
          </View>
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
            value={userInfo?.companyId?.name}
          />
        </View>
      </View>
    );
  };

  return (
    <>
      <HeaderMenuDrawer
        titleScreen={'Thông tin người dùng'}
        nameMenuRight={isEditing ? 'content-save' : 'account-edit'}
        typeMenuRight="MaterialCommunityIcons"
        colorMenuRight="white"
        sizeMenuRight={commons.sizeIcon28}
        onPressMenuRight={onPressEdit}
        styleMenuRight={{marginRight: 5}}
      />
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
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

        <View
          style={{
            backgroundColor: 'white',
            elevation: 2,
            marginTop: -30,
            marginHorizontal: commons.margin20,
            paddingHorizontal: commons.padding15,
            borderRadius: 8,
            marginBottom: 10,
            paddingTop: 25,
          }}>
          <InputView
            id="name"
            ref={(input) => (refInput['name'] = input)}
            style={{
              ...styles.containerInput,
            }}
            colorTextDisable={'black'}
            label={<LabelView title={'Tên người dùng'} />}
            placeholder="Nhập tên ..."
            value={userInfo?.name || noData}
            styleContainer={{borderWidth: isEditing ? 0.5 : 0}}
            isShowClean={isEditing}
            returnKeyType="next"
            editable={isEditing}
            colorBorderDisable={commons.colorMain}
            onSubmitEditing={() => focusTheField('phoneNumber')}
          />
          <InputView
            id="phoneNumber"
            ref={(input) => (refInput['phoneNumber'] = input)}
            style={{
              ...styles.containerInput,
            }}
            colorTextDisable={'black'}
            label={<LabelView title={'Số điện thoại'} />}
            placeholder="Nhập số điện thoại ..."
            value={userInfo?.phoneNumber || noData}
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
            value={userInfo?.parentId?.name || noData}
            label={<LabelView title={'Quản lý trực tiếp'} />}
            isShowClean={false}
            styleContainer={{borderWidth: 0}}
            editable={false}
          />
          <InputView
            id="email"
            ref={(input) => (refInput['email'] = input)}
            style={{
              ...styles.containerInput,
            }}
            colorTextDisable={'black'}
            label={<LabelView title={'Email'} />}
            placeholder="Nhập email ..."
            value={userInfo?.email || noData}
            styleContainer={{borderWidth: isEditing ? 0.5 : 0}}
            isShowClean={isEditing}
            colorBorderDisable={commons.colorMain}
            returnKeyType="next"
            editable={isEditing}
          />
          <InputView
            id="dateOfBirth"
            ref={(input) => (refInput['dateOfBirth'] = input)}
            style={{
              ...styles.containerInput,
            }}
            colorTextDisable={'black'}
            label={<LabelView title={'Ngày sinh'} />}
            placeholder="Nhập ngày sinh ..."
            value={userInfo?.dateOfBirth || noData}
            styleContainer={{borderWidth: isEditing ? 0.5 : 0}}
            isShowClean={isEditing}
            colorBorderDisable={commons.colorMain}
            returnKeyType="next"
            editable={isEditing}
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
              selectedValue={GENDER.find((item) => item.id == userInfo.gender)}
              onValueChange={(itemValue, itemIndex) => {
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
            value={moment(userInfo?.createdAt).format('DD-MM-YYYY') || noData}
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
            value={moment(userInfo?.updatedAt).format('DD-MM-YYYY') || noData}
            label={<LabelView title={'Cập nhật lần cuối'} />}
            isShowClean={false}
            styleContainer={{borderWidth: 0}}
            editable={false}
          />
        </View>
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    bottom: 0,
    height: '40%',
    width: '100%',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPickerGender: {
    borderColor: commons.colorMain,
    marginBottom: 15,
    borderRadius: commons.borderRadius4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
