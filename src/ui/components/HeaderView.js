import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import ToolbarView from './ToolbarView';
import commons from '../commons';

const AppStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

function getToolbar(data) {
  if (!data || (data.renderToolbar && data.renderToolbar.props)) {
    return data.renderToolbar;
  }
  return <ToolbarView {...data} style={data.styleToolbar} />;
}

export default function HeaderView(props) {
  let isToolbar = props.isToolbar;
  let isStatusBar = props.isStatusBar !== undefined ? props.isStatusBar : true;
  let styleHeader = [styles.style, props.styleHeader];

  return (
    <LinearGradient
      locations={[1, 1, 1]}
      // locations={[0, 0.5, 0.8]}
      colors={props.colorsLinearGradient}
      style={styleHeader}>
      {isStatusBar && (
        <AppStatusBar
          backgroundColor={props.colorStatusbar || 'transparent'}
          style={{height: StatusBar.currentHeight}}
        />
      )}
      <SafeAreaView backgroundColor={props.colorsLinearGradient[0]} />
      {isToolbar && getToolbar(props)}
      {props.isShowToolbarBottom && props.renderToolbarBottom}
    </LinearGradient>
  );
}

HeaderView.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

HeaderView.defaultProps = {
  colorsLinearGradient: commons.colorsLinearGradient,
};

const styles = StyleSheet.create({
  style: {
    position: 'relative',
  },

  statusBar: {
    height: StatusBar.currentHeight,
  },
});
