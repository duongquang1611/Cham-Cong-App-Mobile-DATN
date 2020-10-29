import React from 'react';
import {Platform, View, Text, LogBox} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu';
import RootNavigation from './navigations';

// redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {myStore, persistor} from './redux/store';
import {LoadingView} from './ui/components';

export default class App extends React.PureComponent {
  render() {
    LogBox.ignoreLogs([
      'Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.',
    ]);
    return (
      <Provider store={myStore}>
        <MenuProvider>
          <PersistGate loading={<LoadingView />} persistor={persistor}>
            <RootNavigation />
          </PersistGate>
        </MenuProvider>
      </Provider>
    );
  }
}
