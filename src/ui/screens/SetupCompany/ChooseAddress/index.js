import {HeaderView} from 'cc-components';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {getLocation} from '../../../commons/location';
import MapInput from './MapInput';
import MyMapView from './MapView';

const latitudeDelta = 0.03;
const longitudeDelta = 0.03;

const ChooseAddress = (props) => {
  const [region, setRegion] = useState({});

  useEffect(() => {
    getInitialState();
  }, []);

  const getInitialState = async () => {
    let data = await getLocation();
    console.log(data);
    setRegion({
      latitude: data.latitude,
      longitude: data.longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  const getCoordsFromName = (loc) => {
    setRegion({
      ...region,
      latitude: loc.lat,
      longitude: loc.lng,
    });
  };
  const onMapRegionChange = (region) => {
    setRegion(region);
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
        <View style={{flex: 1}}>
          <MapInput notifyChange={(loc) => getCoordsFromName(loc)} />
        </View>

        {region['latitude'] ? (
          <View style={{flex: 1}}>
            <MyMapView
              region={region}
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
