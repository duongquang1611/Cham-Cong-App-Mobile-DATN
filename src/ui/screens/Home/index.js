import React, {useState, useEffect} from 'react';
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
import {HeaderView, IconView, InputView, TextView} from '../../components';
import commons from '../../commons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {GET, isSuccess, POST} from '../../../networking';
import urlAPI from '../../../networking/urlAPI';
import models from '../../../models';

const HomeScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.commonReducer.isLoading);
  const isLoginSuccess = useSelector(
    (state) => state.authReducer.isLoginSuccess,
  );
  const authReducer = useSelector((state) => state.authReducer);
  const [userInfo, setUserInfo] = useState({});
  const onPress = () => {
    appNavigate.navToAccountScreen(navigation.dispatch, {});
  };
  const onShowLoading = () => {
    dispatch(actions.isShowLoading(!isLoading));
  };
  const onPressAbc = (data) => {
    console.log('onPressAbc -> data', data);
  };

  // useEffect(() => {
  //   getUserInModel();
  // }, []);
  // const getUserInModel = async () => {
  //   let user = await models.getUserInfo();
  //   setUserInfo(user);
  // };
  useEffect(() => {
    console.log('HomeScreen -> authReducer', authReducer);

    // isLoginSuccess && alert(models.getTokenSignIn());
    // isLoginSuccess && alert(isLoginSuccess);
  }, [isLoginSuccess]);
  const logout = () => {
    console.log('logout -> logout');
    dispatch(actions.requestLogout());
  };
  const getUser = async () => {
    // let res = await GET(urlAPI.allUsers);
    let body = {
      username: 'quang_077',
      password: 123456,
      name: 'Duong Quang',
      phoneNumber: '0123456755',
      roleId: '5f905b70d20a752c708d6632',
      companyId: '5f9060db047bf739f070688e',
    };
    let admin = {
      username: 'admin',
      password: '123456',
    };
    console.log('getUser -> models.getTokenSignIn()', models.getTokenSignIn());
    if (!models.getTokenSignIn()) {
      console.log('login');
      let res = await POST(urlAPI.signin, admin);
      console.log('getUser -> res', res);
      if (isSuccess(res)) {
        let data = {
          userId: res.data.user._id,
          token: res.data.token,
          roleId: res.data.user.roleId._id,
        };
        dispatch(actions.responseLoginSuccess(data));
      } else {
        console.log(isSuccess(res), res.response.data);
      }
    }
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
          <Text>Loading: {isLoading ? 'true' : 'false'}</Text>
        </TouchableOpacity>
        {isLoading && <ActivityIndicator size="small" color="green" />}
        {isLoginSuccess ? (
          <TextView id="testc" style={styles.button} onPress={logout}>
            Logout
          </TextView>
        ) : (
          <TextView
            id="testc"
            style={styles.button}
            onPress={() => {
              getUser();
            }}>
            Login
          </TextView>
        )}

        <Text>{JSON.stringify(models.getUserInfo())}</Text>
        <Text>{JSON.stringify(models.getTokenSignIn())}</Text>
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
