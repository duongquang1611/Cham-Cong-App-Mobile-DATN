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
    // flex: 1,
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
  title: {
    fontSize: commons.fontSize16,
    fontWeight: 'bold',
  },
  containerBottomButton: {
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    height: commons.heightHeader + 5,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  textBottomButton: {
    color: 'white',
    fontSize: commons.fontSize16,
  },
  subContainerBottomButton: {
    backgroundColor: commons.colorMain,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 5,
  },
});
export default baseStyles;
