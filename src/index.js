import React from 'react';
import {Platform, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu';
import RootNavigation from './navigations';

export default class App extends React.PureComponent {
  render() {
    return (
      <MenuProvider>
        <RootNavigation />
      </MenuProvider>
    );
  }
}
