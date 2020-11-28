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
    backgroundColor: 'white',
    height: commons.heightHeader + 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  textBottomButton: {
    color: 'white',
    fontSize: commons.fontSize16,
    textAlign: 'center',
  },
  subContainerBottomButton: {
    backgroundColor: commons.colorMain,
    // width: '100%',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 5,
  },
  styleContainerItemSheet: {
    height: commons.heightDefault,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: commons.margin,
  },
  itemSheet: {
    fontSize: commons.fontSize16,
    fontWeight: '800',
  },
  containerItemSheet: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  containerRenderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: commons.padding10,
    backgroundColor: commons.border,
    width: commons.widthPercent(100),
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: 5,
    paddingHorizontal: commons.padding,
    elevation: 3,
  },
});
export default baseStyles;
