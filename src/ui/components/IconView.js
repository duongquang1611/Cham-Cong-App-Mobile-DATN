import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {
  createIconSetFromFontello,
  createIconSetFromIcoMoon,
} from 'react-native-vector-icons';
import PropTypes from 'prop-types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import commons from '../commons';

export const IconViewType = Object.freeze({
  LocalIcon: 'LocalIcon',
  // EVImage: 'EVImage',
  AntDesign: 'AntDesign',
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  Fontisto: 'Fontisto',
  Foundation: 'Foundation',
  Ionicons: 'Ionicons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  MaterialIcons: 'MaterialIcons',
  Octicons: 'Octicons',
  SimpleLineIcons: 'SimpleLineIcons',
  Zocial: 'Zocial',
});

import icoMoonConfig from '../../../assets/selection.json';
import fontelloConfig from '../../../assets/config.json';
// const LocalIcon = createIconSetFromFontello(fontelloConfig);
const LocalIcon = createIconSetFromIcoMoon(icoMoonConfig);

const IconView = ({onPress, ...props}) => {
  let Icons = Icon(props.type);
  let disabledOnPress = onPress ? false : true;
  const onPressIcon = () => {
    onPress({id: props.id, data: props.data});
  };
  let style = [styles.styleContainer, props.style];
  return (
    <TouchableOpacity
      style={style}
      disabled={disabledOnPress}
      onPress={onPressIcon}
      onLayout={props.onLayout}>
      {/* {props.type === IconViewType.EVImage ? ( */}
      {props.type === 'image' ? (
        <Image
          source={props.imgSource}
          style={[props.styleImage, {resizeMode: 'center'}]}
        />
      ) : (
        <Icons
          name={props.name}
          // style={props.styleImage}
          type={props.type || IconViewType.LocalIcon}
          // type={props.type || IconViewType.FontAwesome}
          size={props.size || commons.sizeIcon}
          color={props.color || commons.colorMain}
        />
      )}
    </TouchableOpacity>
  );
};

const Icon = (type) => {
  switch (type) {
    case IconViewType.LocalIcon:
      return LocalIcon;
    case IconViewType.AntDesign:
      return AntDesign;
    case IconViewType.Entypo:
      return Entypo;
    case IconViewType.EvilIcons:
      return EvilIcons;
    case IconViewType.Feather:
      return Feather;
    case IconViewType.FontAwesome:
      return FontAwesome;
    case IconViewType.FontAwesome5:
      return FontAwesome5;
    case IconViewType.Fontisto:
      return Fontisto;
    case IconViewType.Foundation:
      return Foundation;
    case IconViewType.Ionicons:
      return Ionicons;
    case IconViewType.MaterialCommunityIcons:
      return MaterialCommunityIcons;
    case IconViewType.MaterialIcons:
      return MaterialIcons;
    case IconViewType.Octicons:
      return Octicons;
    case IconViewType.SimpleLineIcons:
      return SimpleLineIcons;
    case IconViewType.Zocial:
      return Zocial;
    default:
      return LocalIcon;
  }
};

export default IconView;

const styles = StyleSheet.create({
  styleContainer: {
    // alignSelf:'baseline',
  },
});

IconView.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.oneOf([
    IconViewType.LocalIcon,
    // IconViewType.EVImage,
    IconViewType.AntDesign,
    IconViewType.Entypo,
    IconViewType.EvilIcons,
    IconViewType.Feather,
    IconViewType.FontAwesome,
    IconViewType.FontAwesome5,
    IconViewType.Fontisto,
    IconViewType.Foundation,
    IconViewType.Ionicons,
    IconViewType.MaterialCommunityIcons,
    IconViewType.MaterialIcons,
    IconViewType.Octicons,
    IconViewType.SimpleLineIcons,
    IconViewType.Zocial,
  ]),
};
