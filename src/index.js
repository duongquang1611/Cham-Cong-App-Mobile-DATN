import React from 'react';
import {Platform, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MenuProvider} from 'react-native-popup-menu';
import RootNavigation from './navigations';

// redux
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {myStore, persistor} from './redux/store';

export default class App extends React.PureComponent {
  render() {
    return (
      <Provider store={myStore}>
        <MenuProvider>
          <PersistGate loading={null} persistor={persistor}>
            <RootNavigation />
          </PersistGate>
        </MenuProvider>
      </Provider>
    );
  }
}
