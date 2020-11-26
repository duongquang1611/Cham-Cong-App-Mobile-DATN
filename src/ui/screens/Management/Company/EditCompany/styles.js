import baseStyles from '../../../../../baseStyles';
import commons from '../../../../commons';

const {StyleSheet} = require('react-native');

const styles = StyleSheet.create({
  ...baseStyles,
  button: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
});
export default styles;
