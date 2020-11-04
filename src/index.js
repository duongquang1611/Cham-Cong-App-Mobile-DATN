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
import {LocaleConfig} from 'react-native-calendars';
LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
  ],
  monthNamesShort: [
    'Th.1',
    'Th.2',
    'Th.3',
    'Th.4',
    'Th.5',
    'Th.6',
    'Th.7',
    'Th.8',
    'Th.9',
    'Th.10',
    'Th.11',
    'Th.12',
  ],
  dayNames: [
    'Chủ Nhật ',
    'Thứ Hai',
    'Thứ Ba',
    'Thứ Tư',
    'Thứ Năm',
    'Thứ Sáu',
    'Thứ Bảy',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};
LocaleConfig.defaultLocale = 'vi';

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
