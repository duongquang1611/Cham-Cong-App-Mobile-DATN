import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import commons from '../commons';

const LoadingView = (props) => {
  return (
    <View style={styles.loading}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={commons.colorMain} />
      </View>
    </View>
  );
};

export default LoadingView;

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    // backgroundColor: 'rgba(0,0,0,0.4)',
  },
  loadingContainer: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});
