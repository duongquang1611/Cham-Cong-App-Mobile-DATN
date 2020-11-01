import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {IconView} from '../components';
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

const DrawerContent = (props) => {
  const userInfo = models.getUserInfo();
  console.log('DrawerContent -> userInfo', userInfo);
  const dispatch = useDispatch();

  const onPressLogout = () => {
    dispatch(actions.requestLogout());
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <Drawer.Section>
          <View style={styles.userInfoSection}>
            <Avatar.Image
              source={{
                uri:
                  'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
              }}
              size={50}
            />
            <Title style={styles.title}>{userInfo?.name}</Title>
            <Text style={styles.caption}>
              Chức vụ: <Text>{userInfo?.roleId?.name}</Text>
            </Text>
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
          {/* <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
            <View style={styles.preference}>
              <Text>RTL</Text>
              <View pointerEvents="none">
                <Switch value={false} />
              </View>
            </View>
          </TouchableRipple> */}
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
  },
  title: {
    marginTop: 20,
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
});
