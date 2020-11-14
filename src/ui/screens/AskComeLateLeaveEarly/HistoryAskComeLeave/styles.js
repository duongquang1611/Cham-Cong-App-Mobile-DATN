import {StyleSheet} from 'react-native';
import baseStyles from '../../../../baseStyles';
import commons from '../../../commons';

const styles = StyleSheet.create({
  ...baseStyles,
  container: {
    backgroundColor: 'white',
    paddingVertical: commons.padding5,
    // paddingHorizontal: commons.padding,
  },
  buttonPicker: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: commons.PersianGreen,
    padding: commons.padding10,
    flex: 1,
  },
  containerInput: {
    marginVertical: commons.margin15,
  },
  styleButtonFocus: {
    ...baseStyles.buttonFilledFocus,
    // marginTop: commons.margin20,
    // marginBottom: commons.margin8,
    height: commons.heightHeader,
  },

  styleDisabled: {
    ...baseStyles.buttonFilledDisable,
    height: commons.heightHeader,
  },

  styleTextButton: {
    fontSize: commons.fontSizeHeader,
    margin: 3,
    color: 'white',
    fontWeight: '700',
  },
});
export default styles;
