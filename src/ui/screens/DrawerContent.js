import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useCallback} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {IconView, TextView} from 'cc-components';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import models from '../../models';
import commons from '../commons';
import {useDispatch} from 'react-redux';
import actions from '../../redux/actions';
import AppImages from '../../../assets/images';
import {Image} from 'react-native';
import {appNavigate} from '../../navigations';
import {useNavigation} from '@react-navigation/native';

const DrawerContent = (props) => {
  const userInfo = models.getUserInfo();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onPressLogout = () => {
    dispatch(actions.requestLogout());
  };
  const onPressChangePassword = useCallback(() => {
    appNavigate.navToOtherScreen(navigation.dispatch, 'ChangePassword');
  }, []);
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Drawer.Section>
          <View style={styles.userInfoSection}>
            <View style={styles.avatar}>
              <Avatar.Image
                source={
                  userInfo?.avatar && userInfo?.avatar?.thumb500
                    ? {uri: userInfo?.avatar?.thumb500}
                    : userInfo?.gender == 0
                    ? AppImages.female
                    : AppImages.male
                }
              />
            </View>
            <View
              style={{
                marginLeft: commons.margin10,
                flexShrink: 1,
                // alignSelf: 'flex-start',
              }}>
              <Title style={styles.title}>{userInfo?.name}</Title>
              <Text style={styles.caption}>
                Chức vụ: <Text>{userInfo?.roleId?.name}</Text>
              </Text>
              {/* <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                }}>
                <IconView
                  type="MaterialCommunityIcons"
                  name="office-building"
                  color="grey"
                  size={commons.sizeIcon18}
                  style={{marginLeft: -3}}
                />
                <Text
                  style={{
                    flexWrap: 'wrap',
                  }}>
                  {userInfo?.companyId?.name}
                </Text>
              </View> */}
            </View>
          </View>
        </Drawer.Section>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItemList
            {...props}
            labelStyle={{fontSize: commons.fontSize16}}
            activeLabelStyle={{
              fontSize: commons.fontSizeHeader,
              fontWeight: 'bold',
            }}
          />
        </Drawer.Section>
        {/* <Drawer.Section title="Preferences"> */}
        <Drawer.Section>
          {/* <DrawerItem
            icon={({color, size}) => (
              <IconView color={color} size={size} name={'password-outline'} />
            )}
            label={'Đổi mật khẩu'}
            labelStyle={{fontSize: commons.fontSize16}}
            onPress={onPressChangePassword}
          /> */}
          <DrawerItem
            icon={({color, size}) => (
              <IconView
                color={color}
                size={size}
                name={'logout'}
                type={'MaterialCommunityIcons'}
              />
            )}
            label={'Đăng xuất'}
            labelStyle={{fontSize: commons.fontSize16}}
            onPress={onPressLogout}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: commons.padding15,
    // flexWrap: 'wrap',
  },
  title: {
    // marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: commons.colorMain,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
