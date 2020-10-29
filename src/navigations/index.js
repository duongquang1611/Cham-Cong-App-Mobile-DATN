import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import appNavigate from './appNavigate';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();

import HomeScreen from '../ui/screens/Home';
import AccountScreen from '../ui/screens/Account';
import LoginScreen from '../ui/screens/Account/LoginScreen';
import SplashScreen from '../ui/screens/Splash';
import {useSelector} from 'react-redux';

const RootNavigation = () => {
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );

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
          <>
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
          </>
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
