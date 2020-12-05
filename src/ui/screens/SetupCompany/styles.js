import baseStyles from '../../../baseStyles';
import commons from '../../commons';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  ...baseStyles,
  input: {
    borderBottomWidth: 0.5,
    borderColor: commons.colorMain,
    color: 'black',
    fontSize: commons.fontSize15,
    // marginBottom: commons.margin5,
  },
  error: {
    fontStyle: 'italic',
    color: 'red',
    fontSize: commons.fontSize12,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: commons.margin,
  },
  valueInfoCompany: {
    color: 'black',
    marginVertical: 15,
    fontSize: commons.fontSize15,
    paddingLeft: 8,
  },
});

export default styles;
