import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const MyMapView = (props) => {
  let map = null;
  return (
    <MapView
      //   style={{flex: 1}}
      style={StyleSheet.absoluteFill}
      ref={(ref) => {
        map = ref;
      }}
      region={props.region}
      showsUserLocation={true}
      pointerEvents={'none'}
      scrollEnabled={true}
      rotateEnabled={true}
      showsUserLocation={true}
      followUserLocation={true}
      zoomEnabled={true}
      zoomControlEnabled={true}
      loadingEnabled={true}
      pitchEnabled={true}
      showsIndoorLevelPicker={true}
      onRegionChange={(reg) => props.onRegionChange(reg)}>
      <Marker coordinate={props.region} />
    </MapView>
  );
};
export default MyMapView;
