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
import SetupCompany from '../ui/screens/SetupCompany';
import TabManagement from '../ui/screens/Management';
import AddAccount from '../ui/screens/Management/Account/AddAccount';
import AddCompany from '../ui/screens/Management/Company/AddCompany';
import ChooseAddress from '../ui/screens/SetupCompany/ChooseAddress';
import EditAccount from '../ui/screens/Management/Account/EditAccount';
import EditCompany from '../ui/screens/Management/Company/EditCompany';
import DetailCompany from '../ui/screens/Management/Company/DetailCompany';
import models from '../models';

const RootNavigation = () => {
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );
  let user = models.getUserInfo();
  let isAdminSystem = commons.isRole('admin_system', user);
  let isAdminCompanyOrDirector =
    commons.isRole('admin_company', user) || commons.isRole('director', user);
  let isManager = commons.isRole('manager', user);
  let isStaff = commons.isRole('staff', user);
  console.log({isAdminSystem, isAdminCompanyOrDirector, isManager, isStaff});
  const isLargeScreen = commons.widthPercent(100) >= 768;

  const DrawerStack = () => {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor: commons.colorMain70,
          activeTintColor: 'white',
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
        // initialRouteName={isAdminSystem ? 'TabManagement' : 'HomeScreen'}
        initialRouteName={isAdminSystem ? 'SetupServer' : 'HomeScreen'}
        // initialRouteName="HomeScreen"
        // drawerType={isLargeScreen ? 'permanent' : 'back'}
        drawerStyle={{width: isLargeScreen ? null : '85%'}}>
        {!isAdminSystem && (
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
        )}
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
        {!isAdminSystem && (
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
        )}
        {!isAdminSystem && (
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
        )}
        {!isAdminSystem && (
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
              drawerLabel: 'Xin nghỉ',
            }}
          />
        )}
        {!isAdminSystem && (
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
              drawerLabel: 'Duyệt xin nghỉ',
            }}
          />
        )}
        {!isAdminSystem && (
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
              drawerLabel: 'Chi tiết chấm công',
            }}
          />
        )}
        {isAdminCompanyOrDirector && (
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
        )}

        {(isAdminSystem || isAdminCompanyOrDirector) && (
          <Drawer.Screen
            name="TabManagement"
            component={TabManagement}
            options={{
              drawerIcon: ({color, size}) => (
                <Image
                  source={AppImages.management}
                  style={{width: size - 4, height: size}}
                  resizeMode="contain"
                />
              ),
              drawerLabel: 'Quản lý',
            }}
          />
        )}

        {isAdminCompanyOrDirector && (
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
        )}
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
        // initialRouteName={'AddAccount'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AddCompany" component={AddCompany} />
        <Stack.Screen name="AddAccount" component={AddAccount} />
        <Stack.Screen name="EditAccount" component={EditAccount} />
        <Stack.Screen name="EditCompany" component={EditCompany} />
        <Stack.Screen name="DetailCompany" component={DetailCompany} />
        <Stack.Screen name="ChooseAddress" component={ChooseAddress} />
        {isLoginSuccess ? (
          <Stack.Screen name="DrawerStack" component={DrawerStack} />
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SetupServer" component={SetupServer} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export {appNavigate};
export default RootNavigation;
