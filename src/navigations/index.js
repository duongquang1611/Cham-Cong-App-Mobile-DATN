import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity, Platform, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import appNavigate from './appNavigate';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
import {useSelector} from 'react-redux';
import commons from '../ui/commons';
import DrawerContent from '../ui/screens/DrawerContent';
import {IconView} from '../ui/components';

import HomeScreen from '../ui/screens/Home';
import AccountScreen from '../ui/screens/Account';
import TabAskComeLateLeaveEarly from '../ui/screens/AskComeLateLeaveEarly';
import TabConfirmComeLateLeaveEarly from '../ui/screens/ConfirmComeLateLeaveEarly';
import AskDayOff from '../ui/screens/AskDayOff';
import TabConfirmDayOff from '../ui/screens/ConfirmDayOff';
import ReportIndividual from '../ui/screens/Report/Individual';
import Report from '../ui/screens/Report';
import Notification from '../ui/screens/Notification';
import LoginScreen from '../ui/screens/Account/LoginScreen';
import SplashScreen from '../ui/screens/Splash';
import AppImages from '../../assets/images';
import SetupServer from '../ui/screens/SetupServer';
import Register from '../ui/screens/Account/Register';
import SetupCompany from '../ui/screens/SetupCompany';

const RootNavigation = () => {
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );
  const isLargeScreen = commons.widthPercent(100) >= 768;

  const DrawerStack = () => {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor: commons.colorMain70,
          activeTintColor: 'white',
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
        // initialRouteName="SetupServer"
        initialRouteName="AskDayOff"
        // initialRouteName="HomeScreen"
        // drawerType={isLargeScreen ? 'permanent' : 'back'}
        drawerStyle={{width: isLargeScreen ? null : '85%'}}>
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            drawerIcon: ({color, size}) => (
              // <IconView
              //   name="home-outline"
              //   size={size}
              //   color={color}
              //   type={'MaterialCommunityIcons'}
              // />
              <Image
                source={AppImages.home}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Chấm công',
          }}
        />
        <Drawer.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            drawerIcon: ({color, size}) => (
              <Image
                source={AppImages.profile}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Thông tin người dùng',
          }}
        />
        <Drawer.Screen
          name="TabAskComeLateLeaveEarly"
          component={TabAskComeLateLeaveEarly}
          options={{
            drawerIcon: ({color, size}) => (
              <Image
                source={AppImages.ask1}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Xin đi muộn, về sớm',
          }}
        />
        <Drawer.Screen
          name="TabConfirmComeLateLeaveEarly"
          component={TabConfirmComeLateLeaveEarly}
          options={{
            drawerIcon: ({color, size}) => (
              <Image
                source={AppImages.confirm}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Duyệt đi muộn, về sớm',
          }}
        />
        <Drawer.Screen
          name="AskDayOff"
          component={AskDayOff}
          options={{
            drawerIcon: ({color, size}) => (
              <Image
                source={AppImages.ask2}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Xin nghỉ phép',
          }}
        />
        <Drawer.Screen
          name="TabConfirmDayOff"
          component={TabConfirmDayOff}
          options={{
            drawerIcon: ({color, size}) => (
              <Image
                source={AppImages.confirm}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Duyệt nghỉ phép',
          }}
        />
        <Drawer.Screen
          name="ReportIndividual"
          component={ReportIndividual}
          options={{
            drawerIcon: ({color, size}) => (
              <Image
                source={AppImages.report}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Báo cáo',
          }}
        />
        <Drawer.Screen
          name="Report"
          component={Report}
          options={{
            drawerIcon: ({color, size}) => (
              <Image
                source={AppImages.reports}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Tổng hợp báo cáo',
          }}
        />
        <Drawer.Screen
          name="Register"
          component={Register}
          options={{
            drawerIcon: ({color, size}) => (
              // <IconView
              //   name="account-check-outline"
              //   size={size}
              //   color={color}
              //   type={'MaterialCommunityIcons'}
              // />
              <Image
                source={AppImages.add_user}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Tạo tài khoản',
          }}
        />
        <Drawer.Screen
          name="SetupCompany"
          component={SetupCompany}
          options={{
            drawerIcon: ({color, size}) => (
              // <IconView
              //   name="account-check-outline"
              //   size={size}
              //   color={color}
              //   type={'MaterialCommunityIcons'}
              // />
              <Image
                source={AppImages.settings}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Cấu hình công ty',
          }}
        />
        {/* <Drawer.Screen
          name="Notification"
          component={Notification}
          options={{
            drawerIcon: ({color, size}) => (
              // <IconView
              //   name="account-check-outline"
              //   size={size}
              //   color={color}
              //   type={'MaterialCommunityIcons'}
              // />
              <Image
                source={AppImages.bell}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Thông báo',
          }}
        /> */}
        <Drawer.Screen
          name="SetupServer"
          component={SetupServer}
          options={{
            drawerIcon: ({color, size}) => (
              <Image
                source={AppImages.server}
                style={{width: size - 4, height: size}}
                resizeMode="contain"
              />
            ),
            drawerLabel: 'Server',
          }}
        />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator
        // initialRouteName={isLoginSuccess ? 'HomeScreen' : 'AccountScreen'}
        initialRouteName={'SplashScreen'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        {isLoginSuccess ? (
          /* <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                // headerShown: false,
                headerRight: (props) => (
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => {
                      alert('Anh yeu em');
                    }}>
                    <Text>I L U</Text>
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
          </> */
          <Stack.Screen name="DrawerStack" component={DrawerStack} />
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export {appNavigate};
export default RootNavigation;
