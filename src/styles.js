import {StyleSheet} from 'react-native';
import commons from './ui/commons';
const buttonFilledNormal = {
  height: commons.heightButtonDefault,
  borderWidth: commons.borderWidth,
  padding: 3,
  // alignSelf: 'center',
};

export default StyleSheet.create({
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
});
