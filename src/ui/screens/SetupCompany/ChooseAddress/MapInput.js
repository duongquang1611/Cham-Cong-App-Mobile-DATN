import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

function MapInput(props) {
  return (
    // <GooglePlacesAutocomplete
    //   placeholder="Nhập địa chỉ ... "
    //   minLength={2} // minimum length of text to search
    //   autoFocus={true}
    //   returnKeyType={'search'} // Can be left out for default return key
    //   listViewDisplayed={'auto'} // 'auto' / null
    //   fetchDetails={true}
    //   onPress={(data, details = null) => {
    //     console.log('MapInput -> data', data, details);
    //     // 'details' is provided when fetchDetails = true
    //     props.notifyChange(details.geometry.location);
    //   }}
    //   query={{
    //     key: 'AIzaSyC_I8fto3Nyu2edss8j64IuLfC99YY5sOQ',
    //     language: 'en',
    //   }}
    //   nearbyPlacesAPI="none"
    //   //   nearbyPlacesAPI="GooglePlacesSearch"
    //   debounce={300}
    //   //   styles={{
    //   //     textInputContainer: {
    //   //       //   backgroundColor: 'grey',
    //   //     },
    //   //     textInput: {
    //   //       height: 38,
    //   //       color: '#5d5d5d',
    //   //       fontSize: 16,
    //   //     },
    //   //     predefinedPlacesDescription: {
    //   //       color: '#1faadb',
    //   //     },
    //   //   }}
    // />
    <GooglePlacesAutocomplete
      placeholder="Nhập địa chỉ ... "
      autoFocus={true}
      returnKeyType={'search'} // Can be left out for default return key
      listViewDisplayed={'auto'} // 'auto' / null
      fetchDetails={true}
      onPress={(data, details = null) => {
        console.log('MapInput -> data', data, details);
        // 'details' is provided when fetchDetails = true
        props.notifyChange(details.geometry.location);
      }}
      query={{
        key: 'AIzaSyC_I8fto3Nyu2edss8j64IuLfC99YY5sOQ',
        language: 'en',
      }}
      nearbyPlacesAPI="none"
      //   nearbyPlacesAPI="GooglePlacesSearch"
      debounce={300}
      minLength={2} // minimum length of text to search
      renderDescription={(row) => {
        console.log('MapInput -> row', row);
        return row.description || row.vicinity;
      }} // custom description render
      getDefaultValue={() => {
        return ''; // text input default value
      }}
    />
  );
}
export default MapInput;
