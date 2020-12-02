import {
  HeaderMenuDrawer,
  HeaderView,
  InputView,
  RadioGroup,
  TextView,
} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../../networking';
import commons from '../../commons';
import baseStyles from '../../../baseStyles';
import {useRoute} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
const SERVER = [
  {id: 0, name: 'Local Server', server: API.BASE_API_URL},
  {id: 1, name: 'Heroku Server', server: API.baseApiUrlHeroku},
  {id: 2, name: 'Tùy chỉnh', server: API.BASE_API_URL},
];

const titleScreen = 'Cài đặt Server';
const SetupServer = (props) => {
  const [dataServer, setDataServer] = useState(SERVER[0]);
  const route = useRoute();
  let net = useNetInfo();
  console.log('🚀 ~ file: index.js ~ line 28 ~ SetupServer ~ net', net);
  console.log(route.params);
  useEffect(() => {
    getServer();
  }, []);

  const getServer = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem(API.keyAsyncStorageBaseUrl);
      console.log('SetupServer -> baseUrl', baseUrl);
      if (baseUrl !== null) {
        let baseUrlParse = JSON.parse(baseUrl);
        if (baseUrlParse?.id === 0) {
          baseUrlParse = SERVER[0];
        }
        setDataServer(baseUrlParse);
      }
    } catch (error) {
      console.log('getServer -> error', error);
    }
  };
  const saveServer = async (data) => {
    try {
      await AsyncStorage.setItem(
        API.keyAsyncStorageBaseUrl,
        JSON.stringify(data),
      );
    } catch (error) {
      console.log('saveServer -> error', error);
    }
  };
  const onChangeText = ({id, data}) => {
    if (id === 'custom') {
      SERVER[2].server = data;
      data = SERVER[2];
    }
    saveServer(data);
    setDataServer(data);
  };
  return (
    <>
      {route?.params && route?.params?.preRoute === 'login' ? (
        <HeaderView
          isToolbar={true}
          isStatusBar={true}
          // nonShowBack
          titleScreen={titleScreen}
          colorIconBack="white"
        />
      ) : (
        <HeaderMenuDrawer titleScreen={titleScreen} />
      )}
      <View style={{margin: 10}}>
        <Text style={[styles.title, {marginVertical: 5}]}>Lựa chọn Server</Text>
        <RadioGroup
          id={'select'}
          data={SERVER}
          currentIndex={dataServer.id || 0}
          //   isWrap={true}
          colorButton={commons.colorMain}
          onSelected={onChangeText}
          //   style={{
          //     marginLeft: commons.margin25,
          //     flex: 1,
          //     flexDirection: 'column',
          //   }}
          styleLabel={{marginLeft: 10}}
        />
        {dataServer?.id !== 1 && (
          <InputView
            id="custom"
            onChangeText={onChangeText}
            style={{marginTop: 15}}
            editable={dataServer?.id === 2}
            isShowClean={false}
            value={dataServer?.server}
            placeholder={`Nhập base url (VD: ${API.baseApiUrlHeroku})`}
          />
        )}
      </View>
      {/* <TextView
        style={{
          backgroundColor: 'pink',
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={async () => {
          let res = await API.GET('/face/test');
          console.log('res', res);
        }}>
        test
      </TextView> */}
    </>
  );
};

export default SetupServer;

const styles = StyleSheet.create({
  ...baseStyles,
});
