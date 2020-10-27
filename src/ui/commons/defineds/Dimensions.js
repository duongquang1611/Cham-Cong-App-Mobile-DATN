import {Dimensions, StatusBar, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
// import {getStatusBarHeight} from 'react-native-status-bar-height';

const EDimensions = {
  DEVICE_ID: DeviceInfo.getUniqueId(),
  SYS_VERSION: DeviceInfo.getSystemVersion(),
  VERSION_APP: DeviceInfo.getVersion(),
  BUILD_NUMBER: DeviceInfo.getBuildNumber(),
  DEVICE_NAME: DeviceInfo.getDeviceName(),
  IS_TABLET_OR_IPAD: DeviceInfo.isTablet(),
  hasNotch: DeviceInfo.hasNotch(),
  SCREEN_HEIGHT: Dimensions.get('window').height,
  SCREEN_WIDTH: Dimensions.get('window').width,
  NAV_BAR_HEIGHT: 50,
  // STATUS_BAR_HEIGHT: getStatusBarHeight(),

  NUMBER_ITEM_PAGE_DEFAULT: 30,

  margin3: 3,
  margin5: 5,
  margin: 8,
  margin10: 10,
  margin15: 15,
  margin20: 20,
  margin25: 25,

  paddingButtom: 3,
  padding5: 5,
  padding: 8,
  padding10: 10,
  padding15: 15,
  padding20: 20,

  fontSizeItemNameCar: 15,
  fontSize8: 8,
  fontSize10: 10,
  fontSize11: 11,
  fontSize12: 12,
  fontSize: 13.5,
  fontSize14: 14,
  fontSize15: 15,
  fontSize16: 16,
  fontSizeHeader: 18,
  fontSize21: 21,
  fontSizeSubHeader: 11,
  fontSizeMenu: 14,
  fontSizeTitleText: 10,

  sizeIcon24: 24,
  sizeIcon28: 28,

  borderRadius4: 4,
  borderRadius: 8,
  borderRadiusCard: 10,
  borderWidth: 0.5,
  borderRadiusButton: 4,
  borderRadiusText: 10,

  sizeIcon8: 8,
  sizeIcon10: 10,
  sizeIcon12: 12,
  sizeIcon14: 14,
  sizeIcon16: 16,
  sizeIcon18: 18,
  sizeIcon20: 20,
  sizeIcon: 24,
  sizeIconToolbar: 20,
  sizeIconText: 16,
  sizeIconCheckbox: 25,

  widthIconInput: 30,
  heightDefault: 40,
  heightInputDefault: 40,
  heightHeader: 50,
  heightButtonDefault: 40,
};

export const guidelineBaseWidth = 360;
export const guidelineBaseHeight = 680;

const scale = (size) => (EDimensions.SCREEN_WIDTH / guidelineBaseWidth) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

const verticalScale = (size) =>
  (EDimensions.SCREEN_HEIGHT / guidelineBaseHeight) * size;
const heightPercent = (percent) => (EDimensions.SCREEN_HEIGHT * percent) / 100;
const widthPercent = (percent) => (EDimensions.SCREEN_WIDTH * percent) / 100;
const heightLocationProject = (flexValue) =>
  ((EDimensions.SCREEN_WIDTH - 16) * flexValue) / 3.5;

export {
  scale,
  verticalScale,
  heightPercent,
  widthPercent,
  heightLocationProject,
  moderateScale,
};

export default EDimensions;
