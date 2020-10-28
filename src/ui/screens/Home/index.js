import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useNavigationBuilder} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {appNavigate} from '../../../navigations';
import actions from '../../../redux/actions';
import {HeaderView, IconView, TextView} from '../../components';
import commons from '../../commons';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isShowLoading = useSelector(
    (state) => state.commonReducer.isShowLoading,
  );

  const onPress = () => {
    appNavigate.navToAccountScreen(navigation.dispatch, {});
  };
  const onShowLoading = () => {
    dispatch(actions.isShowLoading(!isShowLoading));
  };
  const onPressAbc = (data) => {
    console.log('onPressAbc -> data', data);
  };
  return (
    <>
      <HeaderView
        isToolbar={true}
        isStatusBar={true}
        nonShowBack
        titleScreen={'Home'}
      />
      <View style={styles.container}>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text>Navigate to account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onShowLoading} style={styles.button}>
          <Text>Loading: {isShowLoading ? 'true' : 'false'}</Text>
        </TouchableOpacity>
        {isShowLoading && <ActivityIndicator size="small" color="green" />}

        <TextView id="test" onPress={onPressAbc}>
          abc
        </TextView>
        <IconView name="calendar" size={30} />
        <IconView name="back" size={30} />
        <IconView name="ios-checkmark-circle-outline" type="Ionicons" />
        <IconView name="arrow-back-ios" type="MaterialIcons" />
        <Icon name="user" size={20} color={commons.colorMain} />
      </View>
    </>
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
