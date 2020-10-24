import React from 'react';
import {Platform, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export default class App extends React.PureComponent {
  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>App cham cong</Text>
        </View>
      </SafeAreaView>
    );
  }
}
