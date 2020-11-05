import {StyleSheet} from 'react-native';
import commons from './ui/commons';
const buttonFilledNormal = {
  height: commons.heightButtonDefault,
  borderWidth: commons.borderWidth,
  padding: 3,
  // alignSelf: 'center',
};

const baseStyles = StyleSheet.create({
  buttonFilledFocus: {
    ...buttonFilledNormal,
    backgroundColor: commons.colorMain,
    borderColor: commons.colorMain,
  },

  buttonFilledDisable: {
    ...buttonFilledNormal,
    backgroundColor: commons.bgButtonDisable,
    borderColor: commons.border,
  },

  buttonOutline: {
    ...buttonFilledNormal,
    backgroundColor: 'white',
    borderColor: commons.colorMain,
  },
  center: {justifyContent: 'center', alignItems: 'center'},
  bottomBlock: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  viewBottomBlock: {
    height: 1,
    backgroundColor: 'lightgray',
    width: commons.widthPercent(100),
    alignSelf: 'center',
    marginVertical: commons.margin,
  },
  containerScrollView: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  lineHeightText: {
    lineHeight: 25,
  },
  rowCenterSpaceBetween: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rowSpaceBetween: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
export default baseStyles;
