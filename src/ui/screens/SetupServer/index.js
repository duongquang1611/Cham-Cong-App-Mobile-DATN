import {HeaderMenuDrawer, InputView, RadioGroup} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../../networking';
import commons from '../../commons';
import baseStyles from '../../../baseStyles';
const SERVER = [
  {id: 0, name: 'Heroku Server', server: API.baseApiUrlHeroku},
  {id: 1, name: 'Local Server', server: API.BASE_API_URL},
  {id: 2, name: 'Tùy chỉnh', server: API.BASE_API_URL},
];

const SetupServer = () => {
  const [dataServer, setDataServer] = useState(SERVER[0]);
  useEffect(() => {
    getServer();
  }, []);

  const getServer = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem(API.keyAsyncStorageBaseUrl);
      console.log('SetupServer -> baseUrl', baseUrl);
      if (baseUrl !== null) {
        setDataServer(JSON.parse(baseUrl));
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
      SERVER[1].server = data;
      data = SERVER[1];
    }
    saveServer(data);
    setDataServer(data);
  };
  return (
    <>
      <HeaderMenuDrawer titleScreen="Cài đặt Server" />
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
        {dataServer?.id === 2 && (
          <InputView
            id="custom"
            onChangeText={onChangeText}
            style={{marginTop: 15}}
            value={dataServer?.server}
            placeholder={`Nhập base url (VD: ${API.baseApiUrlHeroku})`}
          />
        )}
      </View>
    </>
  );
};

export default SetupServer;

const styles = StyleSheet.create({
  ...baseStyles,
});
