import {HeaderView, showAlert} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {getLocation} from '../../../commons/location';
import MapInput from './MapInput';
import MyMapView from './MapView';

const latitudeDelta = 0.03;
const longitudeDelta = 0.03;

const ChooseAddress = (props) => {
  const [isGranted, setIsGranted] = useState(false);

  const [state, setState] = useState({
    region: {},
    ready: true,
    filteredMarkers: [],
  });
  useEffect(() => {
    requestLocationPermission();
  }, [isGranted]);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //To Check, If Permission is granted
        setIsGranted(true);
      } else {
        showAlert({msg: 'Permission Denied.'});
      }
    } catch (err) {
      console.log('ChooseAddress -> err', err);
      showAlert({msg: err.message});
    }
  };
  useEffect(() => {
    isGranted && getInitialState();
  }, [isGranted]);

  const getInitialState = async () => {
    let data = await getLocation();
    console.log(data);
    setState({
      ...state,
      region: {
        latitude: data.latitude,
        longitude: data.longitude,
        latitudeDelta,
        longitudeDelta,
      },
    });
  };

  const getCoordsFromName = (loc) => {
    console.log('getCoordsFromName -> loc', loc);
    setState({
      ...state,
      region: {
        ...state.region,
        latitude: loc.lat,
        longitude: loc.lng,
      },
    });
  };
  const onMapRegionChange = (reg) => {
    // console.log('onMapRegionChange -> region', reg);
    setState({
      ...state,
      region: reg,
    });
  };
  return (
    <>
      <HeaderView
        isToolbar={true}
        isStatusBar={true}
        // nonShowBack
        titleScreen={'Chọn địa chỉ'}
        colorIconBack="white"
      />
      <View style={{flex: 1}}>
        {/* <View style={{flex: 1}}>
          <MapInput notifyChange={(loc) => getCoordsFromName(loc)} />
        </View> */}

        {state.region['latitude'] ? (
          <View style={{flex: 1}}>
            <MyMapView
              region={state.region}
              onRegionChange={(reg) => onMapRegionChange(reg)}
            />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default ChooseAddress;

const styles = StyleSheet.create({});
