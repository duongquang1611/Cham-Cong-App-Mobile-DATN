import commons from '../../commons';
import {StyleSheet} from 'react-native';
import baseStyles from '../../../baseStyles';

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
});
export default styles;
