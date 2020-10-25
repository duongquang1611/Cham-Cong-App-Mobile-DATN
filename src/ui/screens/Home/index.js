import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation, useNavigationBuilder} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {appNavigate} from '../../../navigations';
import actions from '../../../redux/actions';

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
  return (
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
