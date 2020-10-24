import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation, useNavigationBuilder} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import AppNavigate from '../../../navigations/AppNavigate';

const HomeScreen = (props) => {
  console.log('HomeScreen -> HomeScreen');
  const navigation = useNavigation();
  const onPress = () => {
    AppNavigate.navToAccountScreen(navigation.dispatch, {});
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>Home</Text>
      <Text>Home</Text>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text>Click vào đây</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
