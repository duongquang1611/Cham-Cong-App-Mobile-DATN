import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import {GET} from '../../../networking';
import urlAPI from '../../../networking/urlAPI';
import commons from '../../commons';
import {HeaderMenuDrawer, InputView} from '../../components';

const AccountScreen = () => {
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.authReducer);
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const {isLoginSuccess} = authReducer;
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  let userLocal = models.getUserInfo();
  const [userInfo, setUserInfo] = useState(userLocal);
  console.log('AccountScreen -> userInfo', userInfo._id);
  const onPressEdit = () => {
    if (!isEditing) {
      setIsEditing(!isEditing);
    } else {
      setIsEditing(!isEditing);
    }
  };

  useEffect(() => {
    getDetailUser(userInfo._id);
  }, []);

  const getDetailUser = async (id) => {
    try {
      let res = await GET(urlAPI.detailUser(id));
      setUserInfo(res);
    } catch (error) {
      console.log('getDetailUser -> error', error);
    }
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
      <ScrollView>
        <LinearGradient
          locations={[0, 0.2, 0.7]}
          colors={commons.colorsLinearGradient}
          style={{height: 150}}
        />
        <View
          style={{
            backgroundColor: 'white',
            elevation: 2,
            marginTop: -30,
            marginHorizontal: commons.margin20,
            padding: commons.padding15,
            borderRadius: 8,
          }}>
          <InputView
            style={{
              ...styles.containerInput,
            }}
            value={userInfo?.name}
            styleContainer={{borderWidth: isEditing ? 0.5 : 0}}
            isShowClean={isEditing}
            editable={isEditing}
            colorTextDisable={'red'}
            colorBorderNormal={'red'}
          />
          <InputView style={styles.containerInput} />
          <InputView style={styles.containerInput} />
          <Text>{JSON.stringify(models.getUserInfo())}</Text>
          <Text>{JSON.stringify(models.getUserInfo())}</Text>
          <Text>{JSON.stringify(models.getUserInfo())}</Text>
        </View>
      </ScrollView>
    </>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
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
    marginVertical: commons.margin10,
  },
});
