// import Geolocation from '@react-native-community/geolocation';
// navigator.geolocation = require('@react-native-community/geolocation');
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    // navigator.geolocation.getCurrentPosition(
    Geolocation.getCurrentPosition(
      (data) => resolve(data.coords),
      (err) => reject(err),
    );
  });
};

export const geocodeLocationByName = (locationName) => {
  return new Promise((resolve, reject) => {
    Geocoder.from(locationName)
      .then((json) => {
        const addressComponent = json.results[0].address_components[0];
        resolve(addressComponent);
      })
      .catch((error) => reject(error));
  });
};

export const geocodeLocationByCoords = (lat, long) => {
  return new Promise((resolve, reject) => {
    Geocoder.from(lat, long)
      .then((json) => {
        const addressComponent = json.results[0].address_components[0];
        resolve(addressComponent);
      })
      .catch((error) => reject(error));
  });
};
