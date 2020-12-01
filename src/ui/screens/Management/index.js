import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {HeaderMenuDrawer, IconView, InputView} from 'cc-components';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {Dimensions} from 'react-native';
import {Portal, Provider} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import models from '../../../models';
import API from '../../../networking';
import actions from '../../../redux/actions';
import commons from '../../commons';
import AccountManagement from './Account';
import ButtonPlusFAB from './ButtonPlusFAB';
import CompanyManagement from './Company';
import {TypeTabManagement} from './TypeTabManagement';

let currentTabFocus = TypeTabManagement.account;
let text = '';
const TabManagement = () => {
  const Tab = createMaterialTopTabNavigator();
  let user = models.getUserInfo();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dayWorkReducer = useSelector((state) => state.dayWorkReducer);

  useEffect(() => {
    getData();
    return () => {
      console.log('unmount tab');
      currentTabFocus = TypeTabManagement.account;
    };
  }, []);

  const getData = async () => {
    // API.getListAskComeLeave(dispatch, filterAskComeLate);
  };

  const onPressIconSearch = () => {
    console.log({text, currentTabFocus});
    switch (currentTabFocus) {
      case TypeTabManagement.account:
        dispatch(actions.saveSearchUser(text));
        break;
      case TypeTabManagement.company:
        dispatch(actions.saveSearchCompany(text));
        break;

      default:
        break;
    }
  };

  const onSubmitSearchText = ({nativeEvent}) => {
    text = nativeEvent.text;
    onPressIconSearch();
  };
  const onChangeTextSearch = ({id, data}) => {
    text = data;
  };

  return (
    <>
      <HeaderMenuDrawer
        // titleScreen={'Quản lý'}
        titleScreen={''}
        rightElement={
          <InputView
            id="search_text"
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 100,
              borderWidth: 0,
            }}
            styleContainerInput={{borderWidth: 0, paddingHorizontal: 5}}
            // onChangeText={onChangeTextSearch}
            placeholder={'Nhập thông tin tìm kiếm ...'}
            iconLeft="search"
            typeIconLeft="FontAwesome"
            // colorIconLeft={commons.colorMain}
            onPressIconLeft={onPressIconSearch}
            onChangeText={onChangeTextSearch}
            sizeIconLeft={commons.sizeIcon20}
            returnKeyType="search"
            onSubmitEditing={onSubmitSearchText}
          />
        }
      />
      <Provider>
        <Tab.Navigator
          // initialRouteName={'AskComeLeave'}
          tabBarPosition="top"
          initialRouteName={'Account'}
          backBehavior="none"
          style={{backgroundColor: 'white'}}
          sceneContainerStyle={{backgroundColor: 'white'}}
          tabBarOptions={{
            labelStyle: {
              textTransform: 'none',
              fontWeight: 'bold',
              fontSize: commons.fontSize14,
            },
          }}
          swipeEnabled={false}
          initialLayout={{width: Dimensions.get('window').width}}>
          <Tab.Screen
            name={'Account'}
            component={AccountManagement}
            options={{tabBarLabel: 'Người dùng'}}
            // initialParams={{demandCode: '111'}}
            listeners={({navigation}) => ({
              focus: (e) => {
                currentTabFocus = TypeTabManagement.account;
              },
            })}
          />
          <Tab.Screen
            name={'Company'}
            component={CompanyManagement}
            // initialParams={{demandCode: demandCode[0]}}
            options={{tabBarLabel: 'Công ty'}}
            listeners={({navigation}) => ({
              focus: (e) => {
                currentTabFocus = TypeTabManagement.company;
              },
            })}
          />
        </Tab.Navigator>
        <Portal>
          <ButtonPlusFAB />
        </Portal>
      </Provider>
    </>
  );
};

export default TabManagement;
