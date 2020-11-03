import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
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
import AskComeLateLeaveEarly from '../ui/screens/AskComeLateLeaveEarly';
import AskDayOff from '../ui/screens/AskDayOff';
import ReportIndividual from '../ui/screens/Report/Individual';
import Report from '../ui/screens/Report';
import Notification from '../ui/screens/Notification';
import LoginScreen from '../ui/screens/Account/LoginScreen';
import SplashScreen from '../ui/screens/Splash';

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
        initialRouteName="ReportIndividual"
        // initialRouteName="HomeScreen"
        // drawerType={isLargeScreen ? 'permanent' : 'back'}
        drawerStyle={{width: isLargeScreen ? null : '85%'}}>
        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            drawerIcon: ({color, size}) => (
              <IconView
                name="home-outline"
                size={size}
                color={color}
                type={'MaterialCommunityIcons'}
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
              <IconView
                name="account-check-outline"
                size={size}
                color={color}
                type={'MaterialCommunityIcons'}
              />
            ),
            drawerLabel: 'Thông tin người dùng',
          }}
        />
        <Drawer.Screen
          name="AskComeLateLeaveEarly"
          component={AskComeLateLeaveEarly}
          options={{
            drawerIcon: ({color, size}) => (
              <IconView
                name="account-check-outline"
                size={size}
                color={color}
                type={'MaterialCommunityIcons'}
              />
            ),
            drawerLabel: 'Xin đi muộn, về sớm',
          }}
        />
        <Drawer.Screen
          name="AskDayOff"
          component={AskDayOff}
          options={{
            drawerIcon: ({color, size}) => (
              <IconView
                name="account-check-outline"
                size={size}
                color={color}
                type={'MaterialCommunityIcons'}
              />
            ),
            drawerLabel: 'Xin nghỉ phép',
          }}
        />
        <Drawer.Screen
          name="ReportIndividual"
          component={ReportIndividual}
          options={{
            drawerIcon: ({color, size}) => (
              <IconView
                name="account-check-outline"
                size={size}
                color={color}
                type={'MaterialCommunityIcons'}
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
              <IconView
                name="account-check-outline"
                size={size}
                color={color}
                type={'MaterialCommunityIcons'}
              />
            ),
            drawerLabel: 'Tổng hợp báo cáo',
          }}
        />
        <Drawer.Screen
          name="Notification"
          component={Notification}
          options={{
            drawerIcon: ({color, size}) => (
              <IconView
                name="account-check-outline"
                size={size}
                color={color}
                type={'MaterialCommunityIcons'}
              />
            ),
            drawerLabel: 'Thông báo',
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
