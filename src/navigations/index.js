import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

const RootStack = createStackNavigator();
const Stack = createStackNavigator();

import HomeScreen from '../ui/screens/Home';
import AccountScreen from '../ui/screens/Account';
import SplashScreen from '../ui/screens/Splash';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={
          {
            //   headerShown: false,
          }
        }>
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
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
